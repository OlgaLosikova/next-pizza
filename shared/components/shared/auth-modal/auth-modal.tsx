import React from 'react'
import { Dialog, DialogContent } from '../../ui/dialog'
import { Button } from '../../ui/button';
import { signIn } from 'next-auth/react';
interface Props {
    open: boolean;
    onClose: () => void;
}
export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
    const handleClose = () => {
        onClose();
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className='w-[450px] bg-white p-10'>
                form
                <hr />
                <div className='flex gap-2'>
                    <Button className='gap-2 h-12 p-2 flex-1' variant={'secondary'} onClick={() => signIn('github', {
                        callbackUrl: '/',
                        redirect: true
                    })}
                        type='button'>
                        <img className='w-6 h-6' src='https://github.githubassets.com/favicons/favicon.svg' />Github
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default AuthModal