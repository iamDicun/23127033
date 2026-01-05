import { useState, useEffect, useContext } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ApiContext from './ApiContext'

export default function ListTickets() {
  // Load API url and key from context
  const api = useContext(ApiContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [meta, setMeta] = useState(null);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('page', page);
    Object.keys(filters).forEach(k => {
      params.append(k, filters[k]);
    });
  
    fetch(`${api.url}/tickets?${params}`, {
      headers: {
        apikey: api.key,
      },
    }).then(async (result) => {
      if (result.status === 200) {
        const json = await result.json();
        setTickets(json.data);
        setMeta(json.meta);
      } else {
        console.error('Cannot load ticket data:', result);
      }
    });
    
    // Update URL with current page
    setSearchParams({ page: page.toString(), ...filters });
  }, [page, filters]);

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

  const handleFilter = () => {
    const filters = {};
    if (selectedCategory !== '') {
      filters.categoryId = selectedCategory;
    }
    if (selectedCustomer !== '') {
      filters.customerId = selectedCustomer;
    }
    setFilters(filters);
    setPage(1);
  };

  const totalPages = meta ? Math.ceil(meta.totalItems / meta.limit) : 0;
  const fromOffset = meta?.limit * (meta?.page - 1) + 1;
  const toOffset = meta?.limit * (meta?.page - 1) + tickets.length;

  const getStatusBadge = (status) => {
    const statusMap = {
      'open': { bg: 'bg-blue-100', text: 'text-blue-800', label: '🔵 Open' },
      'in_progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '🟡 In Progress' },
      'resolved': { bg: 'bg-green-100', text: 'text-green-800', label: '✅ Resolved' },
      'closed': { bg: 'bg-gray-100', text: 'text-gray-800', label: '⚫ Closed' }
    };
    return statusMap[status] || statusMap['open'];
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'high': { bg: 'bg-red-100', text: 'text-red-800', label: '🔴 Cao' },
      'medium': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '🟡 Trung bình' },
      'low': { bg: 'bg-green-100', text: 'text-green-800', label: '🟢 Thấp' }
    };
    return priorityMap[priority] || priorityMap['low'];
  };

  return (
    <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filter Section */}
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          🔍 Bộ lọc Tickets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                const categoryId = e.target.value;
                setSelectedCategory(categoryId);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khách hàng
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => {
                const customerId = e.target.value;
                setSelectedCustomer(customerId);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả khách hàng</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleFilter}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer"
            >
              🔍 Lọc kết quả
            </button>
          </div>
        </div>
      </div>
      {/* Tickets Table */}
      <div
        id="ticketsTable"
        className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ưu tiên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody id="ticketsBody" className="bg-white divide-y divide-gray-200">
              {tickets.map(t => {
                const status = getStatusBadge(t.status);
                const priority = getPriorityBadge(t.priority);
                const customer = customers.find(c => c.id === t.customerId);
                const category = categories.find(c => c.id === t.categoryId);

                return (<tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {t.id}
                  </td>
                  <td
                    className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate"
                    title={t.title}
                  >
                    {t.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {customer?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {category?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priority.bg} ${priority.text}`}>
                      {priority.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(t.createdAt).toLocaleString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={`/tickets/${t.id}`}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition duration-200"
                    >
                      👁️ View
                    </Link>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-700">
            Hiển thị {fromOffset}-{toOffset} của {meta?.totalItems} tickets (Trang {meta?.page}/{totalPages})
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
              className={`px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm ${page > 1 ? 'hover:bg-gray-50 cursor-pointer transition duration-200' : 'opacity-50 cursor-not-allowed'}`}
            >
              ← Trước
            </button>
            <span className="flex space-x-1 px-3 py-2 text-sm font-medium">
              {[...Array(totalPages).keys()].map(i => i + 1).map(p => (<button key={p} onClick={() => setPage(p)} className={`rounded-lg px-3 py-2 ${p === page ? 'bg-blue-600 text-white font-bold cursor-not-allowed' : 'bg-white border border-gray-300 hover:bg-gray-50 cursor-pointer transition duration-200'}`}>
                {p}
              </button>))}
            </span>
            <button
              onClick={() => {
                if (page < totalPages) {
                  setPage(page + 1);
                }
              }}
              className={`px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm ${page < totalPages ? 'hover:bg-gray-50 cursor-pointer transition duration-200' : 'opacity-50 cursor-not-allowed'}`}
            >
              Sau →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
