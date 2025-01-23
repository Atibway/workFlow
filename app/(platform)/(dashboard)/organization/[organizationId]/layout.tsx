import { OrgControl } from "./_components/OrgControl";


const OrganisationIdLayout = ({
    children
}:{
    children: React.ReactNode;
}) => {
  return (
   <div>
   <OrgControl/>
     {children}
   </div>

  )
}

export default OrganisationIdLayout