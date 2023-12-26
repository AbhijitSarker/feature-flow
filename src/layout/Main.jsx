import { useState } from "react";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../pages/Home/SideBar/SideBar";
import { Link, Outlet } from 'react-router-dom';
import { GiCrossedBones } from "react-icons/gi";
import { FaBarsStaggered } from "react-icons/fa6";
import Search from "../components/Search/Search";
import FeatureForm from "../components/FeatureForm/FeatureForm";

const Main = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div >
            <NavBar></NavBar>
            <div className="rounded flex flex-col lg:flex-row  mx-10 p-3 bg-white shadow-md -mt-10">



                {/* Mobile Menu Icon */}
                <div className="lg:hidden flex justify-between items-center">
                    <button onClick={toggleSidebar} className="text-gray-200 p-3 focus:outline-none" >
                        {isSidebarOpen ? <GiCrossedBones className='text-4xl text-primary' /> : <FaBarsStaggered className='text-4xl text-primary' />} </button>
                </div>

                {/* Sidebar */}
                <aside className={`bg-background rounded-md  sticky top-5 md:h-full text-black w-full lg:w-80 ${isSidebarOpen ? 'block' : 'hidden'} lg:block  p-3 md:p-6`} >
                    {/* Sidebar content */}
                    <h1 className='text-primary text-4xl text-center mb-5 font-bold font-serif'>Feature Flow</h1>

                    <FeatureForm></FeatureForm>

                </aside>

                {/* Main content area */}
                <main className="flex-1 p-6 lg:p-10 ">
                    {/* Main content */}
                    <Search></Search>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, voluptas qui voluptates deleniti amet beatae distinctio ipsa ad similique ut facilis alias, explicabo, tenetur velit nihil labore. Distinctio quia labore fugiat deserunt ipsum delectus. Placeat soluta temporibus ipsa laborum illum omnis at quisquam tempore eos neque odit voluptas, non unde provident. Harum consectetur suscipit possimus accusamus magni. Facere ad velit tempora ipsam dolor sed inventore maiores ipsum pariatur quas quasi, culpa dolorum quae harum animi officia ducimus minima amet ullam dicta vero qui quibusdam dolorem enim! Officiis, doloremque. Dolor impedit quidem, voluptas magnam odit doloremque doloribus placeat natus ex deleniti deserunt at quod quos. Sint quibusdam quo cum. Modi qui nobis cupiditate odio vero? Ut ab, quibusdam illum unde ex impedit eius quidem reprehenderit sunt perferendis necessitatibus magnam veritatis adipisci dolorem eos rem eveniet sit earum vitae consequatur tempora provident. Ea, et molestiae maxime ipsum consequuntur quaerat suscipit atque minus delectus voluptatum dolore quisquam facilis voluptatibus recusandae ex voluptate? Dolor praesentium maiores ducimus voluptatem veniam enim qui explicabo suscipit, culpa magni laboriosam recusandae, dicta autem quam unde labore? Ut modi aliquid atque, nemo repellendus illo, minima illum consequatur, incidunt neque nam maxime magnam amet? Adipisci, delectus nostrum! Unde animi vero expedita harum voluptate nihil. Incidunt debitis ratione reiciendis eveniet aliquid minus perferendis impedit porro, tempore nulla! Incidunt voluptas cupiditate odit quibusdam laboriosam veniam, beatae et consequuntur ex, laborum error minus quidem excepturi, numquam architecto enim natus officiis qui maiores eum recusandae animi? Repellendus corrupti fugit quisquam libero ab reiciendis quaerat hic aliquid asperiores necessitatibus eum, dicta porro sequi magnam illo dolorum, sapiente ipsum pariatur praesentium tempore eos odit dolorem vel. Animi cupiditate a optio nisi modi cum sunt ea culpa quisquam! Quos repudiandae sapiente aut iure delectus ducimus? Iure eum libero eos provident quia mollitia facere in magni quis molestias qui, at enim! Commodi doloribus omnis ratione enim. Minus quisquam, cum hic soluta debitis eum, impedit ipsum veniam quidem distinctio itaque atque, ut veritatis enim nihil provident eos! Perspiciatis, consectetur beatae nobis reprehenderit quidem est debitis veritatis cumque ut nemo, error illo sunt accusamus amet quia obcaecati fuga natus, in cupiditate cum illum saepe quibusdam et. Commodi, id! Perspiciatis, voluptas maxime suscipit odio harum unde consequuntur distinctio dolorem excepturi sunt quo placeat facilis officia vel. Consequatur eaque natus sunt officiis repellendus numquam corrupti illo aliquam a perferendis. Ab error, fugiat distinctio laudantium saepe esse ipsam iste reprehenderit minus, dolores nulla perspiciatis, facilis obcaecati nisi impedit. Porro dignissimos est sequi, eveniet autem hic tempore quaerat temporibus perspiciatis distinctio dicta vero voluptatum repudiandae minima reprehenderit. Tempora ab consectetur quisquam! Sed magnam ad nam omnis, molestiae quis. Molestias non quis culpa ullam voluptatibus dignissimos. Aperiam repudiandae ab expedita voluptatum itaque provident odit alias voluptatibus illo explicabo error blanditiis atque natus laboriosam vel rerum laudantium, placeat veritatis. Possimus iusto non vitae, obcaecati minima, provident nulla odio aperiam ea neque quidem voluptas molestias eveniet. Rem officiis temporibus voluptates suscipit cumque culpa tempore aliquam hic tempora beatae fugiat perferendis corrupti asperiores illum aperiam omnis rerum autem laborum, nam explicabo impedit! Maiores vero qui consequatur corporis tempora ad veritatis exercitationem sint accusantium cupiditate aliquam architecto tenetur, magni quo rerum impedit, provident eos perspiciatis rem dolorum quis, est nulla. Quaerat odio consequuntur mollitia cumque consectetur optio inventore nobis, esse fugiat dicta, ipsam sunt earum officiis quo expedita eligendi! Blanditiis atque ullam temporibus, labore impedit debitis corrupti praesentium ipsa a vel consequatur minima commodi nisi excepturi accusantium cumque veniam eos tempora? Reiciendis asperiores doloremque aspernatur exercitationem fuga quisquam molestiae laborum iure repellendus magnam voluptatum cupiditate assumenda suscipit qui, corporis deleniti expedita, eum excepturi facere ullam mollitia eos! Illo maxime commodi iusto natus. Veniam unde recusandae corporis porro doloribus amet officia. Voluptatibus delectus optio explicabo quis voluptatem modi, odio natus ratione. Aliquam deserunt praesentium dolor hic ipsam necessitatibus atque beatae dicta qui, corporis, rerum nemo itaque quas. Quisquam nostrum quam harum. Neque doloremque, voluptate nam possimus sapiente eos qui accusantium hic recusandae alias, quia pariatur quis ipsa debitis odit, nemo impedit numquam tempora consequuntur corrupti! Porro deleniti veritatis, consequatur fuga reiciendis, tenetur cum nobis sit impedit commodi eveniet aliquam quasi unde minus corporis deserunt ea cupiditate sequi esse itaque rerum magnam possimus id? Repellendus consequuntur eos ad maiores facilis minus numquam aliquid mollitia possimus, maxime veritatis libero exercitationem. Ab laborum natus atque recusandae. Deleniti excepturi quos sunt! Ullam tempore magnam fugit blanditiis est ab reiciendis, illo velit dignissimos accusantium soluta repellat, magni accusamus error dolores quam voluptatem placeat quia ut qui similique, quas mollitia quis ipsum! Libero, consequatur tempore cupiditate tempora temporibus rerum sapiente, quis minus repellendus quo adipisci quae odio doloremque, earum quia fugit magni. Fuga porro reprehenderit magnam deserunt doloribus at ad possimus quam non vel. Aspernatur sit illo hic? A eius ipsam, odit, exercitationem, quod sint quasi veniam provident enim dignissimos nobis tempora aperiam. Dignissimos, minima amet? Esse voluptate autem commodi sunt sequi, dolorem numquam dignissimos nemo necessitatibus rerum, quis quas! Voluptates culpa, provident laboriosam nulla eligendi veritatis, nam at impedit quis omnis accusamus. Quo facilis, quisquam eos nulla ducimus maxime a, quaerat nihil voluptatum omnis quidem nostrum soluta ullam praesentium sint, possimus corporis atque. Ex aliquam aperiam, dolorum quaerat at omnis nobis odit. Consequatur est eum libero blanditiis ratione, explicabo mollitia quas optio quasi magnam nam labore deleniti consectetur. Explicabo quis minima quo id quasi minus quas delectus aliquid laborum culpa veniam cum architecto ducimus hic animi sunt maiores accusamus rem, doloribus officia sed quae porro ullam adipisci? Placeat deserunt itaque aut ab eligendi aperiam et numquam dignissimos magni illo veniam ducimus, magnam quam quidem molestiae nisi necessitatibus, optio consectetur nostrum. Ad delectus minima et, fuga officiis accusantium est dolor. Nisi dolorum officiis voluptatibus reiciendis quaerat suscipit nesciunt, nam fuga illum, debitis fugiat mollitia maxime delectus placeat, aliquid repellat. Ab ullam, pariatur atque ipsa quo incidunt a nulla voluptatibus quibusdam ratione nihil accusamus quas. Odio, alias laborum? Tempora, expedita quod. Non quibusdam reprehenderit saepe itaque velit ducimus officiis, modi iure quo? Modi reprehenderit vitae nihil, dolore voluptate suscipit hic provident qui repudiandae! Ut quasi perferendis voluptatibus?
                </main>
            </div>


        </div >
    );
};

export default Main;