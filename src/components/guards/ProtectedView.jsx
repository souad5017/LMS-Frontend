
function ProtectedView({ session, allowedRoles, children }) {
  if (!session || !session.user) {
    return null;
  }

  if (!allowedRoles.includes(session.user.role)) {
    return <div role="alert">Accès refusé</div>;
  }

  return children;
}

export default ProtectedView;
