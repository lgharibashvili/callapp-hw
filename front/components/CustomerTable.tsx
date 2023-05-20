import { FunctionComponent, useState } from "react";
import { Button, Space, Table } from "antd"
import useCustomers from "@/hooks/useCustomers";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CustomerEditorModal from "./CustomerEditorModal";
import { Customer } from "@/client/types";
import { toTitleCase } from "@/utils";


type EditState = {
  isEditing: boolean
  id?: number
}

const CustomerTable: FunctionComponent = () => {
    const { customers, remove } = useCustomers()
    const [editing, setEditing] = useState<EditState>({isEditing: false})

    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Gender', dataIndex: 'gender', key: 'gender',
          render: (gender: string) => toTitleCase(gender)},
      { title: 'Address', children: [
        { title: 'Street', dataIndex: ['address', 'street'], key: 'address.street' },
        { title: 'City', dataIndex: ['address', 'city'], key: 'address.city' },
      ]},
      { title: 'Phone', dataIndex: 'phone', key: 'phone' },
      { key: 'delete', render: (customer: Customer) => 
          <Button 
            onClick={(e) => {
              e.stopPropagation()
              remove(customer)
            }}
            icon={<DeleteOutlined/>} danger aria-label='Delete Record'/>}
    ]

    return (
        <div>
          <Button
              size='large' style={{margin: '1rem', marginLeft: '2rem'}}
              icon={<PlusOutlined/>} onClick={() => setEditing({isEditing: true})}>
            Add Customer
          </Button>
          <CustomerEditorModal
              isOpen={editing.isEditing} id={editing.id}
              onClose={() => setEditing({isEditing: false})}/>
          <Table 
              pagination={{position: ['topRight'], size: 'default'}} size='middle'
              rowKey="id" dataSource={Object.values(customers)} columns={columns}
              rowClassName={record => record.pending? 'cursor-pointer pending': 'cursor-pointer'}
              onRow={customer => ({
                onClick: () => setEditing({isEditing: true, id: customer.id})
              })}/>
        </div>
    )
}
export default CustomerTable