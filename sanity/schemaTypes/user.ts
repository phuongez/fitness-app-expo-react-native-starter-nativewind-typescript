import {defineType, defineField} from 'sanity'
import {User} from 'lucide-react'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon: User,
  description: 'Thông tin cơ bản của user, liên kết với Clerk ID.',
  fields: [
    defineField({
      name: 'clerkId',
      title: 'Clerk ID',
      type: 'string',
      description: 'ID của user trong Clerk. Thường trùng với _id nếu bạn set khi tạo user.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Email đăng ký trong Clerk',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Tên hiển thị của user',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})
