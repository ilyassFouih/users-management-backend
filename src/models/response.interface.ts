export interface Response {
    /**
     * -1 : internal error 
     *  0 : logic error 
     *  1 : success 
     */
    status: -1 | 0 | 1
    message: string 
    results ?:any
}
export enum Status{
    SUCCESS=1,
    LOGIC_ERROR=0,
    SERVER_ERROR=-1

}

export function getResponse(status:Status,message:string,results?:any){
    let resp:Response={status,message,results}
    return resp
}