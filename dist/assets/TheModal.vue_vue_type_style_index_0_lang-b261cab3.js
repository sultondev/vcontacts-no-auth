import{e as n,o as s,g as d,w as i,T as c,c as r,a as o,x as m,h as u,d as _,i as f,m as p}from"./index-969b7808.js";const v="/assets/delete-icon-0c064d3c.svg",h={key:0,class:"modal-wrapper fixed top-0 w-auto h-auto z-[1000]"},y=n({__name:"TheModal",props:{containerClasses:{default:"bg-white rounded-xl"},modalKey:null,isModalOpen:{type:Boolean}},emits:["closeModal"],setup(e,{emit:t}){return(l,a)=>(s(),d(c,{name:"modal",mode:"out-in"},{default:i(()=>[e.isModalOpen?(s(),r("div",h,[o("div",{class:"modal__backdrop bg-[#00000080] w-full h-screen w-screen flex justify-center items-center",onClick:a[0]||(a[0]=f(w=>t("closeModal",e.modalKey||""),["self"]))},[o("div",{class:m([e.containerClasses,"modal__container"])},[u(l.$slots,"default",{},()=>[_("Default")])],2)])])):p("",!0)]),_:3}))}});export{y as _,v as a};
