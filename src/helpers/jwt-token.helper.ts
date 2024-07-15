
export function exportJwtTokenFromRequest(context: any) {
    let jwtToken = '';
    if(context) {
        const contextArray = context.req.rawHeaders;
        if(contextArray.includes('Authorization')) {
            const tokenIndex = contextArray.indexOf('Authorization') + 1;
            jwtToken = contextArray[tokenIndex];
        }
    }
    return jwtToken;
}