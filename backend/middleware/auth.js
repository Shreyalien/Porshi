const jwt = require('jsonwebtoken');

// এই middleware token থাকলে req.user বসিয়ে দেয়, না থাকলেও request আটকায় না —
// কিছু route শুধু "logged in হলে extra info" চায়, সবকিছু login-বাধ্যতামূলক না।
function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    try {
      const token = header.split(' ')[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // invalid/expired token — just proceed as guest
    }
  }
  next();
}

// এই middleware login বাধ্যতামূলক করে
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Login করা লাগবে' });
  }
  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Session মেয়াদ শেষ, আবার login করো' });
  }
}

module.exports = { optionalAuth, requireAuth };
