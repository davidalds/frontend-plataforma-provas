import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import { IPropsTableBase } from './interfaces/table'

const TableBase = ({ headers, children }: IPropsTableBase) => {
  return (
    <Table>
      <Thead>
        <Tr>
          {headers.map((h, index) => (
            <Th key={index}>{h}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  )
}

export default TableBase
