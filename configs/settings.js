const path = require('path')

const current_path = __dirname
const root =  path.join(current_path, '..')

module.exports = {
    project_root_absolute: root,
    // project_root : '/',
    static_root_absolute:  path.join(root, 'storages'),
    static_root_relative:  'storages',

    project_url : '',
    static_url : '/static',
}
