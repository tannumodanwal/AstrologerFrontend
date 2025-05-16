import React from "react";
import { getAllAstrologers } from "./useConnetFile";
import { Link } from "react-router";
import MinimumBalanceModal from '../Common/MinimumBalanceModal';
import axios from 'axios';

class AstrologerList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      astrologers: [],
      showModal: false,
      selectedAstrologer: null,
    };
  }

  componentDidMount() {
    getAllAstrologers()
      .then((data) => {
        this.setState({ astrologers: data });
      })
      .catch((error) => {
        console.error("Error fetching astrologers:", error);
      });
  }

  handleChatClick = async (astrologer) => {
  try {
    // Parse the user object correctly
    const userData = JSON.parse(localStorage.getItem('data'));
    const userId = userData?.user?.id;

    const astrologerId = astrologer.id;
    const communicationType = 'CHAT';

    const response = await axios.post(
      'http://localhost:9999/api/orders/book',
      {
        userId,
        astrologerId,
        communicationType,
      }
    );

    if (response.status === 201) {
      const order = response.data;
      localStorage.setItem('orderId', order.id);
      window.location.href = '/ChatBox';
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Error booking order:', error);
    alert('Failed to book order. Please try again.');
  }
};


  closeModal = () => {
    this.setState({
      showModal: false,
      selectedAstrologer: null,
    });
  };


  render() {

    // Filter astrologers based on the search term passed as a prop
    const { searchTerm } = this.props;
    const { astrologers, showModal, selectedAstrologer } = this.state;
    const filteredAstrologers = astrologers.filter((astrologer) =>
    astrologer.status === 'APPROVED' && (
    astrologer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    astrologer.knowledge.toLowerCase().includes(searchTerm.toLowerCase())
  )
);


    return (
      <div>
      
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filteredAstrologers.map((astrologer) => (
            <li key={astrologer.id} className="bg-white rounded-md shadow-md p-4 flex items-center gap-4">

              {/* Astrologer Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src={astrologer.photourl}
                  alt={astrologer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Astrologer Details */}

              <div className="flex-grow">
                <h2 className="font-semibold text-lg">{astrologer.name}</h2>
                <p className="text-sm text-gray-500">{astrologer.knowledge}</p>
                <p className="text-xs text-gray-400">Language: {astrologer.language}</p>
                <p className="text-xs text-gray-400">Exp: {astrologer.experience}</p>
                <div className="flex items-center mt-1">

                  <div className="text-yellow-500 text-sm mr-2">
                    {Array.from({ length: Math.round(astrologer.rating) }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                    {Array.from({ length: 5 - Math.round(astrologer.rating) }).map((_, index) => (
                      <span key={`empty-${index}`} className="text-gray-300">☆</span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500">{astrologer.orders} orders</p>
                </div>

                <p className="font-bold text-gray-700 text-sm">₹{astrologer.price}/min</p>

              </div>
              {/* Chat Button */}
              <div className="ml-auto">
                <button
                  onClick={() => this.handleChatClick(astrologer)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-xs"
                >
                  Chat
                </button>
              </div>
            </li>
          ))}

           {/* Conditionally render the modal */}
        {showModal && selectedAstrologer && (
          <MinimumBalanceModal
            amount={selectedAstrologer.price * 2}
            astrologer={selectedAstrologer.name}
            onClose={this.closeModal}
          />
        )}
        </ul>
        
      </div>
    );
  }
}

export default AstrologerList;