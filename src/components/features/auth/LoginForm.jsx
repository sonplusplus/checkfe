import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Github from "@mui/icons-material/GitHub";
import Google from "@mui/icons-material/Google";
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  InputAdornment, 
  IconButton 
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";

function LoginForm({ handleClose, toggleForm }) {
  const navigate = useNavigate();
  const { login, loading, error, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  // Redirect if user logs in successfully
  useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user, handleClose]);

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (formData.password.length < 1) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await login(formData);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Welcome Back
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Sign in to your account
      </Typography>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="border shadow-md rounded-md border-gray-300">
            <Button variant="outline" className="w-full border" onClick={handleGoogleLogin}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </div>

          <div className="border shadow-md rounded-md border-gray-300">
            <Button fullWidth className="border" variant="" onClick={handleGitHubLogin} startIcon={<Github />} sx={{borderColor: "black"}}>
              GitHub
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            fullWidth
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Box component="span">
            Don't have an account?{" "}
            <Button onClick={toggleForm} className="text-primary font-bold">
              Sign Up Now
            </Button>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}

LoginForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

export default LoginForm;