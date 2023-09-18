// ../pages/collection.js

import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { IoClose } from 'react-icons/io5';
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import './collection.css';

import background from '../images/background.jpg';  // 假设图片用于测试



const Collection = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [note, setNotes] = useState({});
  const [tempNote, setTempNote] = useState('');  // 添加一个新的状态变量来暂存文本框的内容

  //示例数据
  const fakeData = [
    { id: 1, price: '$300,000', address: '26 iris avenue, Coniston NSW 2500' },
    { id: 2, price: '$400,000', address: '27 iris avenue, Coniston NSW 2500' },
    { id: 3, price: '$500,000', address: '27 iris avenue, Coniston NSW 2500' },
    { id: 4, price: '$500,000', address: '27 iris avenue, Coniston NSW 2500' },
    { id: 5, price: '$500,000', address: '27 iris avenue, Coniston NSW 2500' },
    { id: 6, price: '$500,000', address: '27 iris avenue, Coniston NSW 2500' },
    { id: 7, price: '$500,000', address: '27 iris avenue, Coniston NSW 2500' },
    // ... 更多假数据
  ];

  const handleAddNote = (id) => {
    setCurrentCardId(id);  // 设置当前卡片的ID
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setTempNote(e.target.value);  // 更新暂存的内容
  };

  const handleSubmitNote = (newNote) => {
    if (newNote.trim() !== '') {
      setNotes({
        ...note,
        // [currentCardId]: newNote, // 使用当前卡片的ID作为键来存储备注
        [currentCardId]: tempNote  // 使用暂存的内容来更新备注
      });
    } else {
      const newNotes = { ...note };
      delete newNotes[currentCardId];  // 如果备注为空，则删除该备注
      setNotes(newNotes);
    }
    setTempNote('');  // 清空临时备注
    setShowModal(false);
  };


  // 分页逻辑
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4; // 每页显示4个卡片
  const totalPages = Math.ceil(fakeData.length / cardsPerPage); // 计算总页数
  //设置页码
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);  // 滚动到页面顶部
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);  // 滚动到页面顶部
    }
  };

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = fakeData.slice(startIndex, endIndex); // 当前页的卡片


  return (
    <>
      <NavBar />
      <div className='header_title'>
        <h1>My collected Properties</h1>
      </div>
      <div className="collection-container">
        {currentCards.map((data) => (
          <div className="card-colect" key={data.id}>
            <div className="viewImg_clect" style={{ backgroundImage: `url(${background})` }}>
              {/* 假设一个图片作为背景 */}
            </div>
            <div className="viewDetial_clect">
              {/* 房屋详情 */}
              <div className="house_detial">
                <div className="price-icon-container">
                  <div className="price_colect">
                    <span className='nameOfPrice'>The current predicted price is</span> 
                    <span className='houseOfPrice'>{data.price}</span>
                  </div>
                  <div className="iconstart_colect">
                    {/* <AiOutlineStar color="gold" size={40} /> */}
                    <AiTwotoneStar color="#FAAB3A" size={40} />
                  </div>
                </div>

                <div className="address">{data.address}</div>
              </div>
              <hr />
              {/* 添加备注 */}
              <div className="note-section">
                <strong>Notes</strong>
                <br />
                <br />
                {note[data.id] ? (
                  <div className="note-text" onClick={() => handleAddNote(data.id)}>
                    {note[data.id]}
                  </div>
                ) : (
                  // <div onClick={handleAddNote} className="add-note">
                  <div onClick={() => handleAddNote(data.id)} className="add-note">
                    Add notes
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Notes</h2>
                <span className="close-button" onClick={() => setShowModal(false)}>
                  <IoClose />
                </span>
              </div>
              <textarea
                defaultValue={tempNote}
                onChange={handleInputChange}  // 当文本框内容改变时，更新暂存的内容
                className='note-textarea' ></textarea>
              <button className="submit-button" onClick={() => handleSubmitNote(tempNote)}>Submit</button>
            </div>
          </div>
        )}
        
      </div>
      {/* 这里是分页控制代码 */}
      <div className="show_page">
        <div className="pagelink_con">
          
          <span className="page-link" onClick={handlePrevPage}> <IoMdArrowDropleft size={20}/>Previous</span>
          <span className="page-link">|</span>
          <span className="page-link" onClick={handleNextPage}>Next <IoMdArrowDropright size={20}/></span>
        </div>
        <div className='pageNum'>
        <span className="page-info">{`${currentPage}/${totalPages}`}</span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Collection;



// 在添加实际传入的数据后，要添加更多功能：
// 1. `添加一个功能，当点击
//  < div className = "collection-container" > 这个卡片（除了add notes部分）时，
//  页面跳转到同在pages文件夹下的PropertyResult.js页面`
 
// 2.  还有页面的图片修改为街景缩略图或搜索该地址网上被上传的图片

// 3.  还有用户的备注要保存在后端，当下一次进入收藏页面时显示出来。
