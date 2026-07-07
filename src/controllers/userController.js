import User from "../models/user.model.js";
import CV from "../models/CV.js";
import PDFDocument from "pdfkit";

/* ===========================
   REGISTER USER
=========================== */
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   LOGIN USER
=========================== */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
const user = await User.findOne({
  email: email.toLowerCase().trim(),
});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = user.generateAccessToken();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   SAVE CV
=========================== */
const saveCV = async (req, res) => {
  try {
    const {
      title,
      summary,
      skills,
      education,
      experience,
      projects,
      languages,
      phone,
      address,
    } = req.body;
if (!title || !skills || skills.length === 0) {
  return res.status(400).json({
    success: false,
    message: "Title and at least one skill are required",
  });
}
    const cv = await CV.create({
      userId: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      phone,
      address,
      title,
      summary,
      skills,
      education,
      experience,
      projects,
      languages,
    });

    return res.status(201).json({
      success: true,
      message: "Professional CV created successfully",
      cv,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   GET USER CV
=========================== */
const getCV = async (req, res) => {
  try {
    const cv = await CV.find({ userId: req.user._id });

    return res.json({
      success: true,
      cv,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   UPDATE CV
=========================== */
const updateCV = async (req, res) => {
  try {
    const cv = await CV.findOneAndUpdate(
  {
    _id: req.params.id,
    userId: req.user._id,
  },
  req.body,
  {
    new: true,
    runValidators: true,
  }
);

if (!cv) {
  return res.status(404).json({
    success: false,
    message: "CV not found",
  });
}

return res.status(200).json({
  success: true,
  message: "CV updated successfully",
  cv,
});

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   DELETE CV
=========================== */
const deleteCV = async (req, res) => {
  try {
   const cv = await CV.findOneAndDelete({
  _id: req.params.id,
  userId: req.user._id,
});

if (!cv) {
  return res.status(404).json({
    success: false,
    message: "CV not found",
  });
}

return res.status(200).json({
  success: true,
  message: "CV deleted successfully",
}); 

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   ANALYZE SKILLS
=========================== */
const analyzeSkills = async (req, res) => {
  try {
    const { skills, requiredSkills } = req.body;

    if (!skills || !requiredSkills) {
      return res.status(400).json({
        success: false,
        message: "skills and requiredSkills required",
      });
    }

    const missingSkills = requiredSkills.filter(
      (skill) => !skills.includes(skill)
    );

    return res.json({
      success: true,
      missingSkills,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   DOWNLOAD CV (PDF)
=========================== */
const downloadCV = async (req, res) => {
  try {
    const cv = await CV.findOne({ userId: req.user._id });

    if (!cv) {
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=CV.pdf");

    doc.pipe(res);

    doc.fontSize(20).text(cv.fullName, { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Email: ${cv.email}`);
    doc.text(`Phone: ${cv.phone || "N/A"}`);
    doc.text(`Address: ${cv.address || "N/A"}`);

    doc.moveDown();
    doc.fontSize(14).text("Summary");
    doc.fontSize(12).text(cv.summary || "N/A");

    doc.moveDown();
    doc.fontSize(14).text("Skills");
    doc.text((cv.skills || []).join(", "));

    doc.moveDown();
    doc.fontSize(14).text("Education");
    cv.education?.forEach((e) => {
      doc.text(`${e.degree} - ${e.college} (${e.year})`);
    });

    doc.moveDown();
    doc.fontSize(14).text("Experience");
    cv.experience?.forEach((e) => {
      doc.text(`${e.position} at ${e.company} (${e.duration})`);
    });

    doc.moveDown();
    doc.fontSize(14).text("Projects");
    cv.projects?.forEach((p) => {
      doc.text(`${p.title}: ${p.description}`);
    });

    doc.end();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  saveCV,
  getCV,
  updateCV,
  deleteCV,
  analyzeSkills,
  downloadCV
};