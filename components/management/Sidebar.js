import React from 'react';

import { FaUserCog, FaGamepad } from 'react-icons/fa';
import { FcStatistics } from 'react-icons/fc';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { MdQueryStats } from "react-icons/md";
import style from '../../styles/admin/Sidebar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
    const router = useRouter();

    return (
        <div className={style.wrapper}>
            <ul>
                <div className={`${style.flex}  ${style.border_bottom}`}>
                    <BsFillHouseDoorFill className={style.icon} />
                    <h2 className={`${style.item_center} ${style.margin_bottom}`}>
                        Dashboard
                    </h2>
                </div>

                <Link href="/management/statistical" passHref>
                    <div
                        className={
                            router.pathname === '/management/statistical'
                                ? `${style.text} ${style.text_active} `
                                : style.text
                        }
                    >
                        <MdQueryStats className={style.icon} />
                        <li className={style.item_center}>Statistical</li>
                    </div>
                </Link>
                <Link href="/management/product" passHref>
                    <div
                        className={
                            router.pathname === "/management/product"
                                ? `${style.text} ${style.text_active} `
                                : style.text
                        }

                    >
                        <FaGamepad className={style.icon} />
                        <li className={style.item_center}>Products</li>
                    </div>
                </Link>
                <Link href="/management/user" passHref>
                    <div
                        className={
                            router.pathname === '/management/user'
                                ? `${style.text} ${style.text_active} `
                                : style.text
                        }
                    >
                        <FaUserCog className={style.icon} />
                        <li className={style.item_center}>Users</li>
                    </div></Link>
            </ul>
        </div>
    );
}
