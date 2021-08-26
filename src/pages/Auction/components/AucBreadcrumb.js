import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { pathnameList, pathnameTextList } from '../config/aucIndex'

function AucBreadcrumb(props) {
    const { location } = props
    // console.log(location)
    // find index，目前匹配的pathname，它的中文是什麼
    const findPathnameIndex = (pathname) => {
        // 找到剛好的，從前面開始找起
        const foundIndex = pathnameList.findIndex(
            (v, i) => v === pathname
        )

        // 沒找到剛好的路徑時用的(動態id params會遇到)
        // 例如：product/detail/123
        // 會用patchnameList的最後一個開始找起
        // 找到最長的比對的那個為路徑
        // ex. `product/detail/112` 會找到 `product/detail`
        if (foundIndex === -1) {
            for (let i = pathnameList.length - 1; i >= 0; i--) {
                if (pathname.includes(pathnameList[i])) {
                    return i
                }
            }
        }
        return foundIndex
    }

    // 有一個項目和二個項目的情況
    const formatText = (index) => {
        if (index === -1) return ''

        // '/產品/嬰兒/初生兒' -> ['','產品','嬰兒', '初生兒']
        const textArray = pathnameTextList[index].split('/')

        // '/product/baby/birth' -> ['','product','baby', 'birth']
        const pathArray = pathnameList[index].split('/')

        const listArray = textArray.map((v, i, array) => {
            if (i === 0) return ''
      
            if (i === array.length - 1) {
              return (
                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                >
                  {v}
                </li>
              )
            }
      
            return (
              <li className="breadcrumb-item">
                <Link to={pathArray.slice(0, i + 1).join('/')}>
                  {v}
                </Link>
              </li>
            )
          })
      
          return listArray
        }

   return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁/競標商品列表</Link>
          </li>
          {formatText(findPathnameIndex(location.pathname))}
        </ol>
      </nav>
    </>
  )
}

export default withRouter(AucBreadcrumb);