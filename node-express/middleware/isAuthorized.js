const permissions = require('../config/permissions');

const isAuthorized = (permission) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];
    const hasPermission = userPermissions.includes(permission);
    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
    }
    next();
  };
}

module.exports = isAuthorized;