import { list } from "@keystone-6/core";
import { integer,
    relationship,
    select,
    text,
    timestamp,
} from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';

export const Ticket = list ({
    fields: {
        subject: text({
            validation: {
                isRequired: true
            }
        }),
        ticketNo: integer({
            
        }),
        post: document({
            formatting: true,
            dividers: true,
            links: true,
        }),
        priority: select({
            type: 'integer',
            options: [
                {label: '1', value: 1},
                {label: '2', value: 2},
                {label: '4', value: 3},
                {label: '4', value: 4},
                {label: '5', value: 5},
   
            ]
        }),
        submitedOn: timestamp(),
        submittedBy: relationship({
            ref: 'User',
            many: false
        }),
        assignedTo: relationship({
            ref: 'User',
            many: false
        }),

    }
})