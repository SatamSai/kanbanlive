import BaseApiService from "./baseApiService";

class InviteServices extends BaseApiService {

    generateInvite = (boardId: string, data: Object) => {
        return this.makeAPICall(`/board/generateInvite/${boardId}`, 'POST', data)
    }

    getInviteInfo = (token: string) => {
        return this.makeAPICall(`/board/${token}/getInviteInfo`, 'GET')
    }

    acceptInvite = (token: string, data: Object) => {
        return this.makeAPICall(`/board/${token}/invitationAction`, 'POST', data)
    }

}


const inviteService = new InviteServices()

export default inviteService