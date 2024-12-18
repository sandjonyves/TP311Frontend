


export function signin(params) {
    
     let s= localStorage.get('signin')
        if (s){
            return true
        }else{
            return false
        }
}