const usecase = require('../usecases/some_mocked_usecase')
const service = require('../services/some_mocked_service')

// [mock function implementation] for this implementation need declare on top level. it must define mock first then call the all related module
// jest.mock('../services/some_mocked_service', ()=>({
//     some_fn: jest.fn()
// }))
// const svc = require('../services/some_mocked_service')
// const uc = require('../usecases/some_mocked_usecase')

describe('test mock', ()=>{
    test('mock function', async ()=>{
        service.some_fn = jest.fn((a)=> a) // if you not pass callback will be undefined
        const a = usecase.some_runner(22)
        expect(service.some_fn).toHaveBeenCalledWith(22)
        expect(a).toEqual(22)

        console.log(service.some_fn)

        service.some_fn.mockReturnValue('test') // change the value
        const b = usecase.some_runner(22)
        expect(b).toEqual('test')
        console.log(b)
    })

    test('mock function implementation', async ()=>{
        service.some_fn = jest.fn()
        const a = usecase.some_runner(22)
        expect(service.some_fn).toHaveBeenCalledWith(22)

        console.log(service.some_fn)

        service.some_fn.mockImplementation((a)=> a + 'test') // change the value
        const b = usecase.some_runner(23)
        expect(b).toEqual('23test')
        console.log(b)
    })


    // when you use jest.mock('.file') -> it will not bring the default function of the file. you need redeclare with mockReturnValue or mockImplementation
    test('mock module and function', async()=>{
        // svc.some_fn.mockRestore() // masih gak bisa. emang ini gak ada default functionnnya
        // console.log(svc, uc)
        // const b = uc.some_runner(11) // it will return error. need to declare mockReturnVale or mockImplementation first like below
        // expect(b).toEqual(undefined)

        console.log()
        svc.some_fn.mockImplementation((a)=> a+'haha') // it still error event some_fn has been mocked
        const c = uc.some_runner(13)
        expect(c).toEqual('13haha')

        const d = uc.some_runner(14)
        expect(d).toEqual('14haha')

    })

})

// this jest.spyOn with you use jest.mock('.file') cannot in the same file. due jest.mock() need to decalre on top and level will overwrite entire file functions. better choose this than jest.mock
describe('test 2', ()=>{
    test('test mock module and function use spyon', async()=>{
        const some_fn = jest.spyOn(service, "some_fn")

        some_fn.mockImplementation((a)=> a+'hai') // need to decalre first

        let cek = usecase.some_runner(11)
        console.log(cek, some_fn)
        expect(service.some_fn).toHaveBeenCalledWith(11)
        expect(cek).toEqual('11hai')

        some_fn.mockRestore() // it can't restore to the original function
        // service.some_fn = original // same.
        // console.log(service.some_fn.toString())
        cek = usecase.some_runner(12)
        expect(cek).toEqual(12)

    })

    test('test mock module and function use spyon2', async()=>{
        // console.log(service.some_fn)
    })
})

