const event = require('node:events')

class GreetingNewUserEvent  extends event.EventEmitter {
    run(id){
        this.emit('event_greeting_new_user', id)
    }
}

const cls = new GreetingNewUserEvent()

const greeting = (user_id)=>{
    setTimeout(()=>{
        console.log(`Triggered greeting event : ${user_id}`)
    }, 2000)
}

cls.on('event_greeting_new_user', greeting)

// cls.emit('event_greeting_new_user', 1) // to trigger
// cls.run(1) // to trigger // this can also

module.exports = cls

