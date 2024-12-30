const jwt = require("jsonwebtoken");

const generateToken = (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ mensaje: "Error del servidor. JWT_SECRET no configurado." });
    }

    const payload = { userId: "admin" };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    if (!token) {
      return res.status(500).json({ mensaje: "Error al generar el token." });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generando el token:", error);
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor al generar el token." });
  }
};

module.exports = { generateToken };
