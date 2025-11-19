import React, { useContext, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { signInWithGoogle, signInWithGithub, setLoading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogle = () => {
    setError("");
    signInWithGoogle()
      .then((result) => {
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || err.code || "Google sign-in failed");
      });
  };

  const handleGithub = () => {
    setError("");
    signInWithGithub()
      .then((result) => {
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || err.code || "Github sign-in failed");
      });
  };

  return (
    <div>
      <h2 className="font-bold mb-5">Login With</h2>
      <div className="space-y-3">
        <button onClick={handleGoogle} className="btn btn-secondary btn-outline w-full">
          <FcGoogle size={24} /> <span className="ml-2">Login with Google</span>
        </button>
        <button onClick={handleGithub} className="btn btn-outline btn-primary w-full">
          <FaGithub size={24} /> <span className="ml-2">Login with Github</span>
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default SocialLogin;
