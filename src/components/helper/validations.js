//The helper file with the different regex rules that we use
//validations are stored in arrays under a key of the appropriate name
//EG: `validation.password` is an array of RegExp rules (and plaintext definitions)
const validation = {
  password:[
    {
      rule: new RegExp("^.{6,}$"),
      msg: "Your password must have at least 6 characters",
    },
    {
      rule: new RegExp("^.*[a-z].*$"),
      msg: "Your password must have at least 1 lowecase character",
    },
    {
      rule: new RegExp("^.*[A-Z].*$"),
      msg: "Your password must have at least 1 uppercase character",
    },
    {
      rule: new RegExp("^.*[0-9].*$"),
      msg: "Your password must have at least 1 number",
    },
    {
      rule: new RegExp(/[-!$%^&*()_+|~=`{}[\]:";'<>?,@#./]/),
      msg: "Your password must have at least 1 symbol",
    },
  ],
  email: [
    {
      rule:new RegExp(/^[a-zA-Z][a-zA-Z0-9.]*@[a-zA-Z]*\.([.a-zA-Z]*)*[a-zA-Z]$/),
      msg:"Please enter a valid email address",
    },
  ],
};
export default validation;