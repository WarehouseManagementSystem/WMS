// table operate
import icon from './icon'

export default {
    check: { icon: icon.check, tip: 'Check', permissions: (status) => status == 1 },
    view: { icon: icon.view, tip: 'View', permissions: (status) => status !== 1 && true },
    edit: { icon: icon.edit, tip: 'Edit', permissions: (status) => status !== 1 &&true },
    delete: { icon: icon.delete, tip: 'Delete', permissions: (status) => status !== 1 &&true },
    flow: { icon: icon.flow, tip: 'Workflow', permissions: (status) => status !== 1 &&true },
}