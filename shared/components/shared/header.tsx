import React from 'react'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import Container from './container'
import Link from 'next/link'
import SearchInput from './search-input'
import CartButton from './cart-button'

interface Props {
  className?: string
}

const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border border-b', className)}>
      <Container className='flex item-center justify-between py-8'>
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='logo' width={35} height={35} />
            <div><h1 className={'text-2xl uppercase font-black'}>Next Pizza</h1>
              <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p></div>
          </div>
        </Link>

        <div className='mx-10 flex-1'>
          <SearchInput />
        </div>

        <div className='flex items-center gap-4'>
          <Button variant='outline' className='flex items-center gap-3'><User size={16} />Войти</Button>
          <div className='flex items-center gap-1 transition'>
<CartButton/>
          </div>
        </div>
      </Container>
    </header>
  )
}
export default Header