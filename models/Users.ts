import { list } from '@keystone-6/core';
import {
    text,
    relationship,
    password,
    timestamp,
    select,
    checkbox
} from '@keystone-6/core/fields'

import { permissions, rules, isAdmin } from './access';

// Here we define the user list.
export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    isAdmin: checkbox({
      access: {
        update: isAdmin
      }
    }),
    // The password field takes care of hiding details and hashing values
    password: password({ validation: { isRequired: true } }),
    role: relationship({
      ref: 'Role.users',
      access: permissions.canManageUsers || isAdmin,
    }),
    department: relationship({
      ref: 'Department.users',
      access: permissions.canManageUsers || isAdmin,
    })
  },
  ui: {
    listView: {        
      initialColumns: ['name'],
    },
  },
  
})

export const Group = list({
  fields: {
    name: text()
  }
})

export const Department = list({
  fields: {
    name: text(),
    users: relationship({
      ref: 'User.department'
    })
  }
})

export const Role = list({
  fields: {
      name: text(),
      canManageContent: checkbox({ defaultValue: false }),
      canManageUsers: checkbox({ defaultValue: false }),
      users: relationship({ ref: 'User.role', many: true }),
  }
})