import useCustomers from "@/hooks/useCustomers"
import { Button, Form, Input, Modal, Select } from "antd"
import { FunctionComponent } from "react"
import { Customer } from "../client/types"

type Props = {
  isOpen: boolean
  id?: number
  onClose: () => void
}

const CustomerEditorModal: FunctionComponent<Props> = props => {
  const { isOpen, id, onClose } = props

  const { update, customers } = useCustomers()
  const usedIds = new Set(Object.keys(customers).map(id => parseInt(id)))

  function onFinish(data: Customer) {
    update(data)
    onClose()
  }

  function validateId(_: any, value: string) {
    if (!id && usedIds.has(parseInt(value))) {
      return Promise.reject('ID is already used')
    }
    return Promise.resolve()
  }

  const initialData = id !== undefined ? customers[id]: {
    id: Math.max(...Array.from(usedIds)) + 1
  }

  return (
    <Modal
        title={id == undefined? 'Add Customer': 'Edit Customer'}
        open={isOpen} onCancel={onClose}
        footer={[
          <Button type='primary' form="customerForm" key="submit" htmlType="submit">
              {id == undefined? 'Create': 'Save'}
          </Button>
        ]}>
      <Form
          id="customerForm" initialValues={initialData}
          style={{paddingTop: '1rem', maxWidth: '30rem'}}
          labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}
          onFinish={onFinish}>
        <Form.Item label="ID" name="id"
            rules={[
              { required: true, message: 'Please input ID of the customer!' },
              { validator: validateId }
            ]}>
          <Input disabled={!!id} type='number'/>
        </Form.Item>
        <Form.Item label="Name" name="name"
            rules={[{ required: true, message: 'Please input name of the customer!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item label="Email" name="email"
            rules={[{ required: true, message: 'Please input email of the customer!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item label="Gender" name="gender"
            rules={[{ required: true, message: 'Please choose gender of the customer!' }]}>
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="non-binary">Non-Binary</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Street" name={['address', 'street']}
            rules={[{ required: true, message: 'Please input street of the customer!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item label="City" name={['address', 'city']}
            rules={[{ required: true, message: 'Please input city of the customer!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item label="Phone" name="phone"
            rules={[{ required: true, message: 'Please input phone number of the customer!' }]}>
          <Input/>
        </Form.Item>
      </Form>
    </Modal>)
}
export default CustomerEditorModal