import { Dispatch, SetStateAction } from "react"

export interface IMarketplaceProduct {
    id: number
    category: string
    location: string
    name: string
    price: number
    saleQty: number
    image: string
    description: string

    // price: number
    // quantityForSale: number
    // quantityForRent: number
    // categoryName: string | undefined
    // categoryId: number | ''
    // locationId: number | ''
    // locationName: string | undefined
    // img: string
    // name: string
    // description: string
    // code: string
    // quantity: number
}

export interface IInventoryProduct {
    id: number,
    code: string,
    description: string,
    price: number,
    name: string,
    category: string,
    categoryId: number,
    saleQty: number,
    lendQty: number,
    combinedQty: number,
    image: string,
    location: string,
    locationId: number
}

export interface IOrder {
    id: number
    productCode: string
    qty: number
    price: number
    date: string
    orderedBy: string
    status: string
    productName: string
    email: string
}

export interface IDescriptionModal {
    id: number
    price: number
    saleQty: number
    category: string | undefined
    location: string | undefined
    image: string
    name: string
    description: string
    // code: string
    // quantity: number
    open: boolean
    handleClose: () => void
}

export interface IModalWrapper {
    open: boolean
    handleClose: () => void
    modalType: string
}

export interface IAddModal {
    open: boolean
    handleClose: () => void
    setInventoryProducts: Dispatch<SetStateAction<any[]>>
    id?: number
    name?: string
    lendQty?: number
    image?: string
}

export interface IButton {
    buttonType: 'button' | 'submit' | 'reset' | undefined
    children?: JSX.Element
    className: string
    buttonText: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

export type Placement =
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';

export interface IPopUp {
    open: boolean
    popUpAnchorEl: HTMLButtonElement | null
    placement: Placement
    closePopUp: (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => void
    confirmFunc: (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => void
    text: string
}

export interface ICategory {
    name: string
    id: number
}

export interface IFormInputs {
    code: string
    name: string
    description: string
    categoryId: number | ''
    locationId: number | ''
    saleQty: number
    lendQty: number
    price: number
    combinedQty: number
    image: string
}

export interface ILendFormInputs {
    email: null | { label: string, value: string }
    quantity: number
}

export interface ILendedItem {
    id: number
    qty: number
    startDate: string
    // email: string
    endDate: string | null
    productCode: string
    productName: string
}

export interface IUserLendedItems {
    email: string
    lentItems: ILendedItem[]
}

export interface ISkeleton {
    key: number
}

export interface INoItemsInList {
    text: string
}

export interface IUser {
    name: string
    avatar: string
    email: string
}

export interface IUserEmail {
    label: string,
    value: string
}