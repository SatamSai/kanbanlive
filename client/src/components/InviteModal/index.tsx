import { useEffect, useState } from 'react'
import { useBoard } from '../../context/boardContext'
import CustomButton from '../CustomButton'
import { BodyContent, HeadingContainer, InviteOptions, InviteSubTitle, InviteTitle, MembersCount, Terms } from './InviteModal.styles'
import { useModal } from '../../context/modalContext'
import inviteService from '../../services/inviteServices'

const InviteModal = () => {

    const { boardInviteInfo, setUserAllBoards } = useBoard()
    const { toggleShowModal } = useModal()
    const [expiryTime, setExpiryTime] = useState('')

    useEffect(() => {
        if (boardInviteInfo) {
            const time = new Date(boardInviteInfo.expiresAt)
            const expTime = time.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            setExpiryTime(expTime)
        }
    }, [boardInviteInfo])


    const handleInvitationAction = async (accept: boolean) => {
        const body = { accept }
        if (boardInviteInfo) {
            const inviteRes = await inviteService.acceptInvite(boardInviteInfo.token, body)

            if (inviteRes.data._id) {
                setUserAllBoards()
            }

            toggleShowModal()

        }
    }

    return (
        <>
            <HeadingContainer>
                <InviteTitle>
                    {boardInviteInfo?.generatedBy.fullname} invited you to as a <b>{boardInviteInfo?.role.toUpperCase()}</b> to the board <b>"{boardInviteInfo?.board.title}"</b>
                </InviteTitle>
            </HeadingContainer>
            <BodyContent>
                <InviteSubTitle>
                    {boardInviteInfo?.board.description}
                </InviteSubTitle>

                <MembersCount>Members: {boardInviteInfo?.board.members?.length}</MembersCount>
                <InviteOptions>
                    <CustomButton text='Decline' onClick={() => { handleInvitationAction(false) }} />
                    <CustomButton text='Accept' onClick={() => { handleInvitationAction(true) }} />
                </InviteOptions>
            </BodyContent>
            <Terms>Invitation Expiry <i>{expiryTime}</i></Terms>
        </>
    )
}

export default InviteModal