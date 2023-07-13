import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  Box,
} from '@chakra-ui/react'
import Link from 'next/link'
import { IPropsBreadcrumb } from './types'

const BreadCrumb = ({ links }: IPropsBreadcrumb) => {
  return (
    <Box p={4}>
      <ChakraBreadcrumb boxShadow={'md'} p={1} rounded={'md'}>
        <BreadcrumbItem fontWeight={'bold'}>
          <Link href={'/'}>Home</Link>
        </BreadcrumbItem>
        {links?.map(({ path, pageName, isCurrent }, index) => (
          <BreadcrumbItem
            key={index}
            fontWeight={'bold'}
            color={isCurrent ? 'mainBlue.600' : 'none'}
            isCurrentPage={isCurrent}
          >
            <Link href={path}>{pageName}</Link>
          </BreadcrumbItem>
        ))}
      </ChakraBreadcrumb>
    </Box>
  )
}

export default BreadCrumb
