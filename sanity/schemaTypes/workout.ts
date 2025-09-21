import {defineType, defineField, defineArrayMember} from 'sanity'
import {CalendarClock} from 'lucide-react'

export default defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  icon: CalendarClock,
  description:
    'Một buổi tập của người dùng, bao gồm ngày tập, thời lượng và danh sách bài tập với set/reps/weight/unit.',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID (Clerk)',
      type: 'string',
      description: 'Clerk User ID của người dùng thực hiện buổi tập',
      validation: (Rule) => Rule.required().error('Bắt buộc có User ID'),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Ngày diễn ra buổi tập',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required().error('Bắt buộc chọn ngày'),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      description: 'Thời lượng buổi tập (phút)',
      validation: (Rule) =>
        Rule.required().integer().min(1).max(600).error('Nhập số phút hợp lệ (1–600)'),
    }),
    defineField({
      name: 'exercises',
      title: 'Exercises',
      type: 'array',
      description:
        'Danh sách các bài tập trong buổi tập. Mỗi mục gồm tham chiếu tới exercise và thông tin set/reps/weight/unit.',
      of: [
        defineArrayMember({
          name: 'workoutExercise',
          title: 'Workout Exercise',
          type: 'object',
          fields: [
            defineField({
              name: 'exercise',
              title: 'Exercise',
              type: 'reference',
              description: 'Chọn bài tập từ danh mục Exercise',
              to: [{type: 'exercise'}],
              validation: (Rule) => Rule.required().error('Chọn bài tập'),
            }),
            defineField({
              name: 'sets',
              title: 'Sets',
              type: 'number',
              description: 'Số hiệp (sets) cần thực hiện',
              validation: (Rule) => Rule.required().integer().min(1).max(20),
            }),
            defineField({
              name: 'reps',
              title: 'Reps',
              type: 'number',
              description: 'Số lần lặp (reps) mỗi hiệp',
              validation: (Rule) => Rule.required().integer().min(1).max(100),
            }),
            defineField({
              name: 'weight',
              title: 'Weight',
              type: 'number',
              description: 'Mức tạ (có thể để trống nếu bài tập trọng lượng cơ thể)',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'weightUnit',
              title: 'Weight Unit',
              type: 'string',
              description: 'Đơn vị tạ. Mặc định dùng kilogram (kg).',
              options: {
                list: [
                  {title: 'kg', value: 'kg'},
                  {title: 'lb', value: 'lb'},
                  {title: 'other', value: 'other'},
                ],
                layout: 'radio',
              },
              initialValue: 'kg',
            }),
          ],
          preview: {
            select: {
              title: 'exercise.name',
              sets: 'sets',
              reps: 'reps',
              weight: 'weight',
              unit: 'weightUnit',
            },
            prepare({title, sets, reps, weight, unit}) {
              const load =
                typeof weight === 'number' && weight > 0 ? ` • ${weight}${unit ?? 'kg'}` : ''
              return {
                title: title ?? 'Exercise',
                subtitle: `${sets ?? '?'} x ${reps ?? '?'}${load}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).error('Thêm ít nhất 1 bài tập cho buổi tập'),
    }),
  ],
  preview: {
    select: {
      date: 'date',
      duration: 'duration',
      userId: 'userId',
      exercises: 'exercises',
    },
    prepare({date, duration, userId, exercises}) {
      const count = Array.isArray(exercises) ? exercises.length : 0
      const shortUser =
        typeof userId === 'string' && userId.length > 8
          ? `${userId.slice(0, 6)}…`
          : (userId ?? 'Unknown')
      const niceDate = date ?? '(no date)'
      const dur = typeof duration === 'number' ? `${duration} min` : '—'
      return {
        title: `${niceDate} • ${dur}`,
        subtitle: `${count} exercise(s) • User: ${shortUser}`,
      }
    },
  },
})
