import {
  React,
  useState,
  useEffect,
  Component,
} from 'react'
import ReactDOM, { render } from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import $ from 'jquery'
import Cookies from 'universal-cookie'

import { Link, withRouter } from 'react-router-dom'
import '../../bootstrap/css/bootstrap.css'
import { Button, Collapse, Modal } from 'react-bootstrap'
import './style/ProductDetail.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import ReactStars from 'react-rating-stars-component'
import swal from 'sweetalert'
import DelayLink from 'react-delay-link'

// -----------svg---------
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdHeart,
  IoIosStar,
} from 'react-icons/io'
import { BiPlus } from 'react-icons/bi'
import { RiSubtractLine } from 'react-icons/ri'
import lightLogo from './svg/lightLogo.svg'
// ---------picture------------
import product1 from './img/productDetail/product1.jpeg'
import product2 from './img/productDetail/product2.jpeg'
import product3 from './img/productDetail/product3.jpeg'
import try1 from './img/productDetail/try1.jpeg'
import try2 from './img/productDetail/try2.jpeg'
import SizePic from './img/productDetail/SizePic.png'
import picsize from './img/productDetail/picsize.png'

function ProductDetail(props) {
  const id = props.match.params.id
  // console.log(id)

  const [open, setOpen] = useState(true)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const [proId, setProId] = useState('1')
  const [proName, setProName] = useState('')
  const [proPrice, setProPrice] = useState('')
  const [proClass, setProClass] = useState('')
  const [proDes, setProDes] = useState('')
  const [proMutImgTry, setProMutImgTry] = useState([])
  const [comments, setComments] = useState('')
  const [product, setProduct] = useState([])
  const [proNum, setProNum] = useState('')
  const [starValue, setStarValue] = useState('')
  const [userId, setUserId] = useState('tascup1')
  const [commentsBlock, setCommentsBlock] = useState([])
  const [starNum, setStarNum] = useState('')
  const [commentsNum, setCommentsNum] = useState('')
  const [starsAverage, setStarsAverage] = useState('')
  const [tryyy, setTryyy] = useState(false)
  const [sendBox, setSendBox] = useState(false)
  const [sendBox2, setSendBox2] = useState(false)
  const [recomments, setRecomments] = useState(false)
  const [sizeSelect, setSizeSelect] = useState('')
  const [newCom, setNemCom] = useState('')
  //---------???????????????
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // ------------- for Gary---------
  const cookies = new Cookies()
  const [sizeGary, setSizeGary] = useState('')
  const [qtyNum, setQtyNum] = useState(1)
  const [sqlProductId, setSqlProductId] = useState('')

  const fadeAnimationHandler: AnimationHandler = (
    props,
    state
  ): AnimationHandlerResponse => {
    const transitionTime = props.transitionTime + 'ms'
    const transitionTimingFunction = 'ease-in-out'

    let slideStyle: React.CSSProperties = {
      position: 'absolute',
      display: 'block',
      zIndex: -2,
      minHeight: '100%',
      opacity: 0,
      top: 0,
      right: 0,
      left: 1000,
      bottom: 0,
      transitionTimingFunction: transitionTimingFunction,
    }

    if (!state.swiping) {
      slideStyle = {
        ...slideStyle,
        WebkitTransitionDuration: transitionTime,
      }
    }

    return {
      slideStyle,
      selectedStyle: {
        ...slideStyle,
        opacity: 1,
        position: 'relative',
      },
      prevStyle: { ...slideStyle },
    }
  }

  async function getProductIdServer() {
    const url = `http://localhost:6005/product/product-list/${id}`

    // ??????header?????????????????????????????????????????????json??????
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    const imgData = data.proMutImg
    const imgArr = JSON.parse(imgData)
    // console.log(data)
    // console.log(imgData)
    // console.log(imgArr)

    setProMutImgTry(imgArr)

    // ????????????
    console.log('data', data)
    setProduct(data)
    setProId(data.proId)
    setProName(data.proName)
    setProPrice(data.proPrice)
    setProDes(data.proDes)
    setProClass(data.proClass)
    setProNum(id)
    setSqlProductId(data.proId)

    // setStarValue(data.starValue)
    // setUserId(data.userId)
    // setComments(data.comments)
    console.log('proNum', proNum)
  }
  useEffect(() => {
    getProductIdServer()
  }, [])
  // console.log(proMutImgTry)

  async function getCommentsServer() {
    const url = `http://localhost:6005/product/commentsTry?id=${id}`

    // ??????header?????????????????????????????????????????????json??????
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    // ????????????
    console.log('comments data', data)
    const commentsLength = data.length
    console.log('commentsLength', commentsLength)
    setCommentsNum(data.length)
    console.log('commentsNum', commentsNum)
    setStarValue(data.starValue)
    setUserId(data.userId)
    setComments(data.comments)
    console.log('proNum', proNum)
    setCommentsBlock(data)
  }
  useEffect(() => {
    getCommentsServer()
  }, [])

  let takePicOut = proMutImgTry.map((e) => {
    return (
      <img
        src={`http://localhost:6005/productpics/${e}`}
        alt=""
      />
    )
  })

  async function addcommentsSever() {
    const newData = {
      proNum,
      userId,
      comments,
      starValue,
    }
    const url = 'http://localhost:6005/product/upload'
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    const id = props.match.params.id
    console.log('??????????????????json??????', data)
    setUserId('tascup1')

    setTimeout(() => {
      setSendBox(false)
      swal({
        text: '????????????',
        icon: 'success',
        button: false,
        timer: 3000,
      })
    }, 500)
    setTimeout(() => {
      props.history.push(
        `/product/product-list/product-detail/${id}`
      )
    }, 500)

    setProNum(id)
    setUserId('tascup1')
  }

  // --------swal------------?????????????????????
  function checkCheck() {
    setTimeout(() => {
      setSendBox2(false)
      swal({
        text: '????????????????????????',
        icon: 'success',
        button: false,
        timer: 3000,
      })
    }, 200)
  }

  //----------???????????????????????????
  useEffect(() => {
    setRecomments(false)
    getCommentsServer()
  }, [recomments])

  //--------------????????????
  useEffect(() => {
    if (qtyNum < 1) {
      setQtyNum(1)
    }
    if (qtyNum > 50) {
      setQtyNum(50)
    }
  }, [qtyNum])

  const commentsCard = commentsBlock.map((pro) => {
    return (
      <>
        <div className="proDe-commentsCard d-flex">
          <div className="proDe-commentsCardLeft">
            <div className="proDe-starsSSSSS">
              <ReactStars
                count={5}
                edit={false}
                value={pro.starValue}
                activeColor="#1D0AFF"
                size={30}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={
                  <i className="fa fa-star-half-alt"></i>
                }
                fullIcon={<i className="fa fa-star"></i>}
              />
            </div>
            <p className="proDe-userName">{pro.userId}</p>
            <p className="proDe-userDate">
              {pro.created_at.split('T')[0]}
            </p>
          </div>
          <div className="proDe-commentsCardRight d-flex">
            <div className="proDe-commentsContent d-flex">
              <p>{pro.comments}</p>
            </div>
          </div>
        </div>
      </>
    )
  })
  async function getstarSumServer() {
    const url = `http://localhost:6005/product/commentsValue?id=${id}`

    // ??????header?????????????????????????????????????????????json??????
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    // ????????????
    console.log('setStarNum', data)
    const starValueSum = data[0].starTotal
    setStarNum(starValueSum)
    console.log('starValueSum', starValueSum)
    console.log('starNum', starNum)
    console.log(
      'starNum / commentsNum',
      starNum / commentsNum
    )
    setStarsAverage(starNum / commentsNum)
    console.log('StarsAverage', starsAverage)
  }

  useEffect(() => {
    getstarSumServer()
  }, [starsAverage])

  // useEffect(() => {
  //   getstarSumServer()
  // }, [recomments])

  function reactStars() {
    return (
      <>
        <ReactStars
          count={5}
          edit={false}
          value={starsAverage}
          // onChange={(e) => {
          //   setRating(trymeme)
          // }}
          activeColor="#1D0AFF"
          size={40}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
        />
      </>
    )
  }

  useEffect(() => {
    reactStars()
  }, [])

  if (!tryyy) {
    setTimeout(() => {
      console.log('executing timeout')
      setTryyy(true)
    }, 1500)
  }

  function refreshPage() {
    window.setTimeout(function () {
      window.location.reload()
    }, 3000)
  }

  // let starsStars = setTimeout(() => {
  //   console.log('Hello, World!')
  // }, 3000)
  // useEffect(() => {
  //   reactStars()
  //   console.log('didmount', starsAverage)
  // }, [starsAverage])

  $('.sizeChoose').click(function () {
    $(this)
      .addClass('sizeSelect')
      .siblings()
      .removeClass('sizeSelect')
  })

  $('.pro-index-heart1').click(function () {
    let color = 0
    if (!color) {
      $(this).addClass('pro-index-heart2')
    }
    if (color) {
      $(this).removeClass('pro-index-heart2')
    }
  })

  function checkCheckheart() {
    setTimeout(() => {
      setSendBox(false)
      swal({
        text: '???????????????????????????',
        icon: 'success',
        button: false,
        timer: 3000,
      })
    }, 200)
  }

  // ----------------???????????????---------------
  /**
   * ?????? event Cookie
   *
   * @param {Object} product ?????????????????? event.
   * @param {number} quantityNum ?????????event.qty????????????.
   * @param {string} type ????????????type???event.qty ??????????????????
   *
   *
   */

  const onCookie = (productid, quantityNum, type) => {
    console.log(type)
    let cookieProductId =
      productid.sqlProductId + '-' + type.sizeGary
    let updateCookie = []
    let cookieProduct = cookies.get('product') // ?????? event cookie

    if (cookieProduct) {
      // ????????????????????? event cookie
      // ??????cookie????????? event id
      const idSet = new Set()
      for (let i in cookieProduct) {
        idSet.add(cookieProduct[i].id)
      }
      // event ??? event cookie ???
      if (idSet.has(cookieProductId)) {
        for (let i in cookieProduct) {
          if (cookieProduct[i].id == cookieProductId) {
            // ??????event??????Input,???????????????????????????
            cookieProduct[i].qty += quantityNum.qtyNum
          }
        }
      } else {
        // ??????????????????event ?????? event cookie ???
        // ???????????????1
        let productjson = {}
        productjson.id = cookieProductId
        productjson.qty = quantityNum.qtyNum
        cookieProduct.push(productjson)
      }
      // ?????????????????????event??????>0????????????cookie ???
      for (let i in cookieProduct) {
        if (cookieProduct[i].qty > 0) {
          updateCookie.push(cookieProduct[i])
        }
      }
    } else {
      // ???????????????????????? event cookie
      // ???????????????1
      let productjson = {}
      productjson.id = cookieProductId
      productjson.qty = quantityNum.qtyNum
      updateCookie.push(productjson)
    }
    cookies.set('product', updateCookie, { path: '/' }) //??????Cookie
    console.log(updateCookie)
  }

  return (
    <>
      <div className="proDe-full">
        <div className="d-flex proDe-move">
          <div className="proDe-leftSide">
            <Carousel className="proDe-wall">
              {takePicOut}
            </Carousel>
          </div>
          <div className="proDe-rightSide">
            <div className="proDe-rightSideBox">
              <div className="proDe-logoTopBox ">
                <div className="proDe-logoBox">
                  <img src={lightLogo} alt="" />
                </div>
                <div>
                  <p className="proBread">
                    <Link
                      to="/product/"
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="proBread1">
                        ????????????
                      </span>{' '}
                    </Link>{' '}
                    /{' '}
                    <Link
                      to="/product/product-list"
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="proBread1">
                        ??????
                      </span>{' '}
                    </Link>{' '}
                    /{' '}
                    <span className="proBread2">
                      {proName}
                    </span>
                  </p>
                </div>
              </div>
              {/* --------------????????????SIZE zone------ */}

              <div className="proDe-chooseBox">
                <div className="proDe-nameAndHeart d-flex">
                  <div className="proDe-name">
                    <p>{proName}</p>
                  </div>
                  <div className="proDe-heartlogo">
                    <Link
                      style={{
                        decoration: 'none',
                        color: 'white',
                      }}
                    >
                      <IoMdHeart
                        className="pro-index-heart1"
                        size={40}
                        onClick={(e) => {
                          e.preventDefault()
                          checkCheckheart()
                        }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="proDe-starsComment d-flex">
                  <div className="proDe-stars">
                    {tryyy === true ? (
                      <ReactStars
                        count={5}
                        edit={false}
                        value={starsAverage}
                        // onChange={(e) => {
                        //   setRating(trymeme)
                        // }}
                        activeColor="#1D0AFF"
                        size={40}
                        isHalf={true}
                        emptyIcon={
                          <i className="far fa-star"></i>
                        }
                        halfIcon={
                          <i className="fa fa-star-half-alt"></i>
                        }
                        fullIcon={
                          <i className="fa fa-star"></i>
                        }
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="proDe-scoresAndWrite">
                    <p>
                      {isNaN(starsAverage) === true
                        ? '0'
                        : tryyy === true
                        ? starsAverage.toFixed(1)
                        : ''}
                      ({commentsNum})
                      <Link
                        style={{ textDecoration: 'none' }}
                      >
                        <span className="proDe-writee">
                          ????????????
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
                {/* -------------price-------- */}

                <div className="proDe-productPrice">
                  <div className="proDe-productPricee">
                    <p>?????????NT${proPrice}</p>
                  </div>
                </div>

                <div className="proDe-sizeBtnBox">
                  {/* ----------SIZE---- */}
                  {proClass === 'C03' ? (
                    <div className="proDe-sizeBtnBox2 d-flex">
                      <div className="proDe-sizeBtnA d-flex">
                        <form
                          className="proDe-sizeBtnA d-flex"
                          action=""
                        >
                          <button
                            className="proDe-sizeBtn sizeChoose"
                            onClick={(e) => {
                              e.preventDefault()
                              setSizeGary('S')
                            }}
                          >
                            S
                          </button>
                          <button
                            className="proDe-sizeBtn sizeChoose"
                            onClick={(e) => {
                              e.preventDefault()
                              setSizeGary('M')
                            }}
                          >
                            M
                          </button>
                          <button
                            className="proDe-sizeBtn sizeChoose"
                            onClick={(e) => {
                              e.preventDefault()
                              setSizeGary('L')
                            }}
                          >
                            L
                          </button>
                        </form>
                      </div>
                      <div className="proDe-sizeCheck">
                        <Link
                          style={{ textDecoration: 'none' }}
                          onClick={handleShow}
                        >
                          <p>???????????????</p>
                        </Link>

                        <Modal
                          show={show}
                          onHide={handleClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>
                              ???????????????
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {' '}
                            <div className="proDe-sizepic">
                              <img src={picsize} alt="" />
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleClose}
                            >
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {/* ----------SIZE---- */}

                  <div className="proDe-proId">
                    <p> ????????????#{proId}</p>
                  </div>
                  <form action="">
                    <div className="proDe-countAndAdd d-flex">
                      <div className="proDe-numberAndBox d-flex">
                        <div className="proDe-numberName">
                          <p>??????</p>
                        </div>
                        <div className="proDe-numberCount ">
                          <div className="d-flex proDe-CountBtn">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault()
                                setQtyNum(qtyNum - 1)
                              }}
                            >
                              <RiSubtractLine size={30} />
                            </button>
                            <input
                              className="proDe-spaceMid"
                              type="button"
                              value={qtyNum}
                            />

                            {/* <div className="proDe-spaceMid">
                              <p> 1</p>
                            </div> */}
                            <button
                              type="button"
                              onClick={(e) => {
                                setQtyNum(qtyNum + 1)
                              }}
                            >
                              <BiPlus size={30} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="proDe-addToCart">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            onCookie(
                              { sqlProductId },
                              { qtyNum },
                              { sizeGary }
                            )
                            checkCheck()
                          }}
                        >
                          <p>???????????????</p>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* ------?????????+-------- */}
              <div className="proDe-appendPlus">
                <button
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                  className="ed-detail-btn col-12 d-flex justify-content-center
                  cn-font p-0 my-3 "
                >
                  <p className="mr-auto proDe-titleName">
                    ????????????
                  </p>
                  <span>
                    <BiPlus size={50} />
                  </span>
                </button>
                <Collapse
                  in={open}
                  className="col-12 p-0  mb-5"
                >
                  <p
                    id="example-collapse-text"
                    className="proDe-invisibleWord"
                  >
                    {proDes}
                  </p>
                </Collapse>
              </div>
              {/* ---------?????????+------- */}
              <div className="proDe-appendPlus">
                <button
                  onClick={() => setOpen2(!open2)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open2}
                  className="ed-detail-btn col-12 d-flex justify-content-center
                  cn-font p-0 my-3 "
                >
                  <p className="mr-auto proDe-titleName">
                    ????????????
                  </p>
                  <span>
                    <BiPlus size={50} />
                  </span>
                </button>
                <Collapse
                  in={open2}
                  className="col-12 p-0  mb-5"
                >
                  <p
                    id="example-collapse-text"
                    className="proDe-invisibleWord"
                  >
                    142.5 x 142.5 ??????<br></br> (?????? x
                    ??????) L56 x H56??????<br></br> ?????????
                    60%??? 40%??????
                    <br></br>
                    ????????????Monogram?????? <br></br>?????????
                    Louis Vuitton?????? ????????????
                  </p>
                </Collapse>
              </div>
              {/* ------------?????????----------- */}
              <div className="proDe-appendPlus">
                <button
                  onClick={() => setOpen3(!open3)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open3}
                  className="ed-detail-btn col-12 d-flex justify-content-center
                  cn-font p-0 my-3 "
                >
                  <p className="mr-auto proDe-titleName">
                    ?????? & ????????????
                  </p>
                  <span>
                    <BiPlus size={50} />
                  </span>
                </button>
                <Collapse
                  in={open3}
                  className="col-12 p-0  mb-5"
                >
                  <p
                    id="example-collapse-text"
                    className="proDe-invisibleWord"
                  >
                    ????????????????????? 7
                    ???????????????????????????????????????????????????????????????
                    30
                    ???????????????????????????????????????????????????????????????????????????
                    0080 149 1188
                    ?????????????????????????????????????????????????????????
                    <br></br>
                    ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    24
                    ?????????????????????????????????????????????????????????
                  </p>
                </Collapse>
              </div>

              {/* ------------????????????zone------- */}
              <div className="proDe-commentsAndBar d-flex">
                <div className="proDe-commentsLeft">
                  <div className="proDe-commentsWord1">
                    <p>????????????</p>
                  </div>
                  <div className="proDe-commentsNumAndStar d-flex "></div>
                </div>

                <div className="proDe-commentsRight d-flex">
                  <p className="proDe-commentsNumAndStar">
                    {isNaN(starsAverage) === true
                      ? '0'
                      : tryyy === true
                      ? starsAverage.toFixed(1)
                      : ''}
                  </p>
                  <div className="proDe-pushLeft">
                    {tryyy === true ? (
                      <ReactStars
                        count={5}
                        edit={false}
                        value={starsAverage}
                        activeColor="#1D0AFF"
                        size={40}
                        isHalf={true}
                        emptyIcon={
                          <i className="far fa-star"></i>
                        }
                        halfIcon={
                          <i className="fa fa-star-half-alt"></i>
                        }
                        fullIcon={
                          <i className="fa fa-star"></i>
                        }
                      />
                    ) : (
                      ''
                    )}
                    <p className="proDe-underStarWord d-flex">
                      {commentsNum}?????????
                    </p>
                  </div>
                </div>
              </div>
              {commentsCard}

              {/* ------------?????????---------- */}
              <div className="col-12 p-0 d-flex justify-content-center flex-wrap">
                <button
                  onClick={() => setOpen4(!open4)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open4}
                  className="ed-comment e-btn-m mb-5 mt-5 proDe-commentsName"
                >
                  <p className="proDe-lastWord">????????????</p>
                </button>
                <Collapse
                  in={open4}
                  className="col-12 p-0 mt-3 mb-5 "
                >
                  <div className="col-12 p-0">
                    <form
                      className="border-0 d-flex flex-wrap justify-content-center"
                      action=""
                    >
                      <ReactStars
                        count={5}
                        onChange={(e) => {
                          setStarValue(e)
                          console.log(e)
                        }}
                        value={0.5}
                        activeColor="#1D0AFF"
                        size={40}
                        isHalf={true}
                        emptyIcon={
                          <i className="far fa-star"></i>
                        }
                        halfIcon={
                          <i className="fa fa-star-half-alt"></i>
                        }
                        fullIcon={
                          <i className="fa fa-star"></i>
                        }
                      />

                      <textarea
                        className="ed-textarea col-12 p-0"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={comments}
                        onChange={(e) => {
                          setComments(e.target.value)
                        }}
                      ></textarea>
                      <div className="flex-wrap5">
                        <button
                          className="ed-leave-msg e-btn-m col-l2 mt-3"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            addcommentsSever()
                            setRecomments(true)
                            refreshPage()
                          }}
                        >
                          <p className="proDe-lastWord2">
                            ????????????
                          </p>
                        </button>
                        <button
                          className="pro-quickbtn"
                          style={{
                            backgroundColor: '#000',
                            color: '#000',
                          }}
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault()
                            setComments(
                              '???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                            )
                          }}
                        >
                          ????????????
                        </button>
                        <button
                          className="pro-quickbtn2"
                          style={{
                            backgroundColor: '#000',
                            color: '#000',
                          }}
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault()
                            setComments(
                              '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                            )
                          }}
                        >
                          ????????????
                        </button>
                        <input
                          className="pro-nametext"
                          type="text"
                          onChange={(e) => {
                            setUserId(e.target.value)
                          }}
                        />
                        <button
                          className="pro-quickname2"
                          style={{
                            backgroundColor: '#000',
                            color: '#000',
                          }}
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault()
                            setUserId('tascup1')
                          }}
                        >
                          ????????????
                        </button>
                      </div>
                    </form>
                  </div>
                </Collapse>
              </div>
              {/* ----------------????????????--------- */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ProductDetail)
