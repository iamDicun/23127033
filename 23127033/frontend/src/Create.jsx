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
  const [serverError, setServerError] = useState({});

  // Zod schema for validation
  const schema = z.object({
    title: z.string().min(3).max(50),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']),
    // Parse number
    categoryId: z.number({ coerce: true }),
  }).refine(async (data) => {
    const category = categories.find(c => c.id === data.categoryId);
    // Exists => true
    return !!category;
  }, {
    message: 'Category ID does not exist',
    path: ['categoryId'],
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
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setServerError({});
    // Submit data to API
    fetch(`${api.url}/tasks`, {
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
        priority: data.priority,
        categoryId: Number(data.categoryId),
      }),
    }).then(async (result) => {
      // 201 => Created
      if (result.status === 201) {
        console.log('Created task successfully!', await result.json());
        navigate('/', { replace: true });
      } else {
        setServerError(await result.json());
        console.error(result);
      }
    });
  };

  return (
    <div className="pt-20 pb-12 max-w-2xl mx-auto px-4">
      <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          ➕ Tạo Task mới
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label for="title" className="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề * (3-50 ký tự)
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tiêu đề task"
            />
            {errors.title && (<p className="mt-1 text-sm text-red-600">{errors.title.message}</p>)}
          </div>
          <div>
            <label for="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Ưu tiên *
            </label>
            <select
              id="priority"
              {...register('priority')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
            >
              <option value="">Chọn mức ưu tiên</option>
              <option value="low">🟢 Thấp</option>
              <option value="medium">🟡 Trung bình</option>
              <option value="high">🔴 Cao</option>
            </select>
          </div>
          <div>
            <label for="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục *
            </label>
            <select
              id="categoryId"
              {...register('categoryId')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
            >
              <option value="">Chọn danh mục</option>
              {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
            {errors.categoryId && (<p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>)}
          </div>
          {serverError.message && (<p className="mt-1 text-sm text-red-600">
            <strong>{serverError.message}</strong>
            {serverError.errors && serverError.errors.length > 0 && (<ul>
              {serverError.errors.map((e, i) => <li key={i}>- "{e.field}": {e.message}</li>)}
            </ul>)}
          </p>)}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 disabled:opacity-50"
          >
            ✅ Tạo Task mới
          </button>
        </form>
      </div>
    </div>
  );
}
