const prisma = require("../config/prisma");
const puppeteer=require("puppeteer");

const modernTemplate = require("../templates/modernTemplate");
const minimalTemplate = require("../templates/minimalTemplate");
const developerTemplate = require("../templates/developerTemplate");

const generatePdf = async (req,res,next)=>{
    try{
        const {id}=req.params;

        const resume= await prisma.resume.findFirst({
            where:{
                id:Number(id),
                userId:req.user.userId
            },
            include: {
                educations: true,
                experiences: true,
                projects: true,
                skills: true
            }
        });

         if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        let html;

        switch(resume.template){

            case "minimal":
                html = minimalTemplate(resume);
                break;

            case "developer":
                html = developerTemplate(resume);
                break;

            default:
                html = modernTemplate(resume);
        }

        const browser= await puppeteer.launch({
            headless:true
        });

        const page = await browser.newPage();

        await page.setContent(html);

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true
        });

        await browser.close();

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${resume.title}.pdf`
        );

        res.send(pdfBuffer);
    }
    catch(error){
        next(error);
    }
};

module.exports = {
    generatePdf
};