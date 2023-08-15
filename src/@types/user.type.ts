interface IPoliceAgent {
   _id : string,
   firstName : string,
   lastName : string,
   surName : string,
   gender : "F" | "H",
   email : string,
   phone : string[],
   username : string,
   password : string,
   birthDate : Date,
   photos?: string[],
   address : string[],
   role : 1 | 2 | 3,
   policeLicense : string
}