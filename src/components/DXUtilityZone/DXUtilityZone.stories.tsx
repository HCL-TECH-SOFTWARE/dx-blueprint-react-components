import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXUtilityZone from './DXUtilityZone';

export default {
    title: "Components/General/Utility Zone",
    component: DXUtilityZone,
    excludeStories: /.*Args$/,
} as Meta<typeof DXUtilityZone>;

const Template: StoryFn<typeof DXUtilityZone> = ( args ) => (
    <div>
        <DXUtilityZone {...args} />
        <div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure totam quo eius, aliquam temporibus commodi cum explicabo nam ut ullam pariatur nostrum quos numquam sit soluta tenetur omnis tempora? Quisquam vitae autem quam alias earum voluptates, reprehenderit nulla asperiores! Voluptas tempore animi adipisci accusamus, facilis optio eveniet mollitia velit blanditiis accusantium nostrum quae vitae soluta natus, sint aut voluptates molestiae porro fugiat, in cupiditate quisquam nisi deserunt. Repudiandae dicta facilis numquam accusantium. Nobis repellat fuga, porro repudiandae corrupti laboriosam animi quas reiciendis quod atque, molestiae dolore sint? Nulla et omnis deserunt explicabo sequi tempora provident itaque eum reiciendis ducimus numquam illo laudantium quia officiis quidem sint, quod tempore vel nam quis. Sequi praesentium voluptatibus impedit excepturi numquam mollitia asperiores beatae aut quidem vitae fuga voluptates, corrupti iure officia magnam ipsa dignissimos facere officiis nemo similique delectus! Molestiae aliquam repellendus quidem quos necessitatibus harum nemo sint animi dignissimos illum, nihil ea nobis impedit. Maiores repellat sequi quas pariatur tempore quibusdam quia. Nam itaque nostrum sequi ab quia eum eligendi, id dolorum rerum qui fugiat, voluptatem delectus earum unde, autem ducimus odit optio repellendus officia quisquam corrupti commodi voluptas natus. Molestias voluptatum beatae nemo dicta nihil adipisci. Officiis pariatur dicta error quia?</p>
        </div>
        <div style={{ marginTop: "1rem" }}>
            <div id="content-1">
                <h3>Test content will be moved inside utility zone</h3>
                <p>Panel 1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto corporis assumenda voluptate consequuntur neque, vero repudiandae error facilis saepe deleniti, nobis tempore totam. Vitae, recusandae ipsa? Numquam corporis repellat enim.</p>
            </div>
            <div id="content-2">
                <h3>Test content will be moved inside utility zone</h3>
                <p>Panel 2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto corporis assumenda voluptate consequuntur neque, vero repudiandae error facilis saepe deleniti, nobis tempore totam. Vitae, recusandae ipsa? Numquam corporis repellat enim.</p>
            </div>
            <div id="content-3">
                <h3>Test content will be moved inside utility zone</h3>
                <p>Panel 3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto corporis assumenda voluptate consequuntur neque, vero repudiandae error facilis saepe deleniti, nobis tempore totam. Vitae, recusandae ipsa? Numquam corporis repellat enim.</p>
            </div>
            <div id="content-4">
                <h3>Test content will be moved inside utility zone</h3>
                <p>Panel 4 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto corporis assumenda voluptate consequuntur neque, vero repudiandae error facilis saepe deleniti, nobis tempore totam. Vitae, recusandae ipsa? Numquam corporis repellat enim.</p>
            </div>
        </div>
    </div>
);

function asyncRenderTest() {
    let content = document.querySelector( "#content-1" );
    setTimeout( async () => {
        try {
            let data = await fetch( 'https://jsonplaceholder.typicode.com/todos/1' );
            let json = await data.json();
            let msg = document.createElement( "h6" );
            msg.append( `${json.userId} - ${json.title}` );
            content?.appendChild( msg );
        } catch ( error ) {
            console.log( "Error: ", error );
        }
    }, 3000 );
}

export const itemsArgs = [
    {
        icon: "ci-Circle_Help",
        onClick: () => {},
        badges: 102,
        label: "content one",
        contentId: "#content-1",
        contentFunction: asyncRenderTest
    },
    {
        icon: "ci-Tag",
        onClick: () => {},
        badges: 102,
        contentId: "#content-2",
        label: "content two",
    },
    {
        icon: "ci-List_Checklist",
        onClick: () => {},
        badges: 102,
        contentId: "#content-3",
        label: "content three",
    },
    {
        icon: "",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            altText: "nice-dog"
        },
        onClick: () => {},
        badges: 102,
        contentId: "#content-4",
        label: "content four",
    }
];
export const Default = Template.bind( {} );
Default.args = {
    items: itemsArgs
};
