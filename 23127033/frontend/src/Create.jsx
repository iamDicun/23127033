import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import ApiContext from './ApiContext'
import { useNavigate } from 'react-router-dom';

export default function Create() {
  // Load API url and key from context
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [serverError, setServerError] = useState({});

  // Zod schema for validation
  const schema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be at most 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be at most 1000 characters'),
    status: z.enum(['open', 'in_progress', 'resolved', 'closed']).default('open'),
    priority: z.enum(['low', 'medium', 'high']),
    customerId: z.number({ coerce: true }),
    categoryId: z.number({ coerce: true }),
  });

  useEffect(() => {
    fetch(`${api.url}/categories`, {
      headers: {
        apikey: api.key,
      },
    }).then(async (result) => {
      if (result.status === 200) {
        setCategories((await result.json()).data);
      } else {
        console.error('Cannot load category data:', result);
      }
    });

    fetch(`${api.url}/customers`, {
      headers: {
        apikey: api.key,
      },
    }).then(async (result) => {
      if (result.status === 200) {
        setCustomers((await result.json()).data);
      } else {
        console.error('Cannot load customer data:', result);
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'open',
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    setServerError({});
    // Submit data to API
    fetch(`${api.url}/tickets`, {
      // Must use POST to submit data
      method: 'POST',
      headers: {
        apikey: api.key,
        // Must be JSON
        'Content-Type': 'application/json',
      },
      // Create JSON from object
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        customerId: Number(data.customerId),
        categoryId: Number(data.categoryId),
      }),
    }).then(async (result) => {
      // 201 => Created
      if (result.status === 201) {
        const responseData = await result.json();
        console.log('Created ticket successfully!', responseData);
        // Navigate to list page (page 1) to see all tickets
        // User can navigate to last page to find the newly created ticket
        navigate('/', { replace: true });
      } else {
        setServerError(await result.json());
        console.error(result);
      }
    });
  };

  return (
    <div className="pt-20 pb-12 max-w-3xl mx-auto px-4">
      <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          ➕ Tạo Ticket mới
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề * (5-100 ký tự)
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tiêu đề ticket"
            />
            {errors.title && (<p className="mt-1 text-sm text-red-600">{errors.title.message}</p>)}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả * (10-1000 ký tự)
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mô tả chi tiết vấn đề"
            />
            {errors.description && (<p className="mt-1 text-sm text-red-600">{errors.description.message}</p>)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái *
              </label>
              <select
                id="status"
                {...register('status')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="open">🔵 Open</option>
                <option value="in_progress">🟡 In Progress</option>
                <option value="resolved">✅ Resolved</option>
                <option value="closed">⚫ Closed</option>
              </select>
              {errors.status && (<p className="mt-1 text-sm text-red-600">{errors.status.message}</p>)}
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Ưu tiên *
              </label>
              <select
                id="priority"
                {...register('priority')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn mức ưu tiên</option>
                <option value="low">🟢 Thấp</option>
                <option value="medium">🟡 Trung bình</option>
                <option value="high">🔴 Cao</option>
              </select>
              {errors.priority && (<p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-2">
                Khách hàng *
              </label>
              <select
                id="customerId"
                {...register('customerId')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn khách hàng</option>
                {customers.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
              {errors.customerId && (<p className="mt-1 text-sm text-red-600">{errors.customerId.message}</p>)}
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục *
              </label>
              <select
                id="categoryId"
                {...register('categoryId')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn danh mục</option>
                {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
              {errors.categoryId && (<p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>)}
            </div>
          </div>

          {serverError.message && (<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-semibold">
              {serverError.message}
            </p>
            {serverError.errors && serverError.errors.length > 0 && (<ul className="mt-2 list-disc list-inside text-sm text-red-600">
              {serverError.errors.map((e, i) => <li key={i}>"{e.field}": {e.message}</li>)}
            </ul>)}
          </div>)}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition duration-200"
          >
            ✅ Tạo Ticket mới
          </button>
        </form>
      </div>
    </div>
  );
}
