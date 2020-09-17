module.exports = {
  "extends": [ 
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest/globals": true,
    "cypress/globals": true
  },
  "globals": {
    "cy": true
  },
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true,
          "modules": true,
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react", "jest", "cypress"
  ],
  "rules": {
      "indent": [
          "error",
          2  
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0
  }
}