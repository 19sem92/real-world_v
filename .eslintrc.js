module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "linebreak-style": 0,
    "new-cap": 0,
    "semi": ["error", "never"],
    "no-console": "off",
    "no-debugger": "off",
    "import/no-unresolved": 0,
    "import/no-unassigned-import": 0,
    "standard/object-curly-even-spacing": 0,
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
      }
    ]
  },
  globals: {}
}
