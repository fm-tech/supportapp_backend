type SessionContext = {
    session?: {
      data: {
        name: string;
        role: {
          canManageContent: boolean;
          canManageUsers: boolean;
        };
      };
      itemId: string;
      listKey: string;
    };
  };
type ItemContext = { item: any; } & SessionContext;
  
// Check to make sure user is signed in
export const isSignedIn = ({ session }: SessionContext) => {
  return !!session;
};

// check to see if user is admin
export const isAdmin = ({ session }: any) => {
    return !!session?.data.isAdmin;
}   

// Check to make sure that this is the user
const isPerson = ({session, item}: any) => {
    return session?.data.id === item.id
}



export const permissions = {
  canManageContent: ({ session }: SessionContext) => {
    return !!session?.data.role?.canManageContent;
  },
  canManageUsers: ({ session }: SessionContext) => {
    return !!session?.data.role?.canManageUsers;
  },
};



export const rules = {
  canUseAdminUI: ({ session }: SessionContext) => {
    return !!session?.data.role;
  },
  canReadContentList: ({ session }: SessionContext) => {
    if (permissions.canManageContent({ session })) return true;
    return { status: { equals: 'published' } };
  },
  canManageUser: ({ session, item }: ItemContext) => {
    if (permissions.canManageUsers({ session })) return true;
    if (session?.itemId === item.id) return true;
    return false;
  },
  canManageUserList: ({ session }: SessionContext) => {
    if (permissions.canManageUsers({ session })) return true;
    if (!isSignedIn({ session })) return false;
    return { where: { id: { equals: session!.itemId } } };
  },
};