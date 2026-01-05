import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import ApiContext from './ApiContext'

export default function Detail() {
  const api = useContext(ApiContext);
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch ticket details
    fetch(`${api.url}/tickets/${id}`, {
      headers: {
        apikey: api.key,
      },
    }).then(async (result) => {
      if (result.status === 200) {
        const json = await result.json();
        setTicket(json.data);

        // Fetch customer details
        fetch(`${api.url}/customers`, {
          headers: {
            apikey: api.key,
          },
        }).then(async (custResult) => {
          if (custResult.status === 200) {
            const custJson = await custResult.json();
            const foundCustomer = custJson.data.find(c => c.id === json.data.customerId);
            setCustomer(foundCustomer);
          }
        });

        // Fetch category details
        fetch(`${api.url}/categories`, {
          headers: {
            apikey: api.key,
          },
        }).then(async (catResult) => {
          if (catResult.status === 200) {
            const catJson = await catResult.json();
            const foundCategory = catJson.data.find(c => c.id === json.data.categoryId);
            setCategory(foundCategory);
          }
        });

        setLoading(false);
      } else if (result.status === 404) {
        setError('Ticket not found');
        setLoading(false);
      } else {
        console.error('Cannot load ticket data:', result);
        setError('Failed to load ticket');
        setLoading(false);
      }
    }).catch((err) => {
      console.error('Error:', err);
      setError('Network error');
      setLoading(false);
    });
  }, [id, api.url, api.key]);

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
      'high': { bg: 'bg-red-100', text: 'text-red-800', label: '🔴 High' },
      'medium': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '🟡 Medium' },
      'low': { bg: 'bg-green-100', text: 'text-green-800', label: '🟢 Low' }
    };
    return priorityMap[priority] || priorityMap['low'];
  };

  if (loading) {
    return (
      <div className="pt-20 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <p className="text-red-600 font-semibold text-lg">❌ {error}</p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ← Back to List
          </Link>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  const status = getStatusBadge(ticket.status);
  const priority = getPriorityBadge(ticket.priority);

  return (
    <div className="pt-20 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          ← Back to List
        </Link>
      </div>

      {/* Ticket Details Card */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-2">Ticket #{ticket.id}</p>
              <h1 className="text-3xl font-bold text-white">{ticket.title}</h1>
            </div>
            <div className="flex flex-col gap-2">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${status.bg} ${status.text}`}>
                {status.label}
              </span>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${priority.bg} ${priority.text}`}>
                {priority.label}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h2>
            <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
              {ticket.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            {/* Customer */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Customer</h3>
              {customer ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-600 mt-1">📧 {customer.email}</p>
                  <p className="text-sm text-gray-600">📞 {customer.phone}</p>
                </div>
              ) : (
                <p className="text-gray-400">Loading...</p>
              )}
            </div>

            {/* Category */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Category</h3>
              {category ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">{category.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
              ) : (
                <p className="text-gray-400">Loading...</p>
              )}
            </div>

            {/* Created At */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Created At</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900">
                  🗓️ {new Date(ticket.createdAt).toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {/* IDs */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">References</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                <p className="text-sm text-gray-700">Customer ID: <span className="font-mono font-semibold">{ticket.customerId}</span></p>
                <p className="text-sm text-gray-700">Category ID: <span className="font-mono font-semibold">{ticket.categoryId}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
