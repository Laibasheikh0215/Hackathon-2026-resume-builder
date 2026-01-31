import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const generatePDF = async (element, filename = 'resume') => {
  try {
    // Show loading
    const loadingDiv = document.createElement('div')
    loadingDiv.style.cssText = `
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 24px;
      z-index: 9999;
    `
    loadingDiv.innerHTML = '<div>📄 Generating PDF...</div>'
    document.body.appendChild(loadingDiv)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Capture element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    })
    
    document.body.removeChild(loadingDiv)
    
    // Create PDF
    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    pdf.save(`${filename.replace(/\s+/g, '_')}.pdf`)
    
    alert('✅ PDF downloaded successfully!')
  } catch (error) {
    console.error('PDF error:', error)
    alert('❌ Error generating PDF')
  }
}