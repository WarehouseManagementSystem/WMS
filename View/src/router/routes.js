import util from './util'

// System
import { SystemRouters } from './Subsystem/System'
import { aRouters } from './Subsystem/a'
import { bRouters } from './Subsystem/b'
import { cRouters } from './Subsystem/c'

export default [
    ...util.Subsystem('System', SystemRouters), // System
    ...util.Subsystem('a', aRouters), // a
    ...util.Subsystem('a-b', bRouters), // a-b
    ...util.Subsystem('c-b', cRouters), // a-b
]