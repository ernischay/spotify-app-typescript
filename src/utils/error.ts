export const handleError = (error: any, service: string) => {
    alert(error.response? error.response.data.error.message : `${service} service failure.`)
}