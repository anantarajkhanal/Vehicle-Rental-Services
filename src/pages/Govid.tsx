import { useState } from "react";
import "./Govid.css";
import Header from "../components/LoginHeader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Govid() {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
    const navigate = useNavigate();
  return (
    <>

      <main className="govid-page">
        <Header />

        <div className="govid-content">
          <div className="govid-container">

            <div className="govid-heading">
              <h1>Upload your Gov ID</h1>
            </div>

            <div className="govid-upload-area">

              <label className="govid-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFrontFile(e.target.files?.[0] || null)
                  }
                />

                <span className="govid-upload-title">FRONT</span>

                <span className="govid-upload-text">
                  {frontFile ? frontFile.name : "Click to upload photo"}
                </span>
              </label>

              <label className="govid-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setBackFile(e.target.files?.[0] || null)
                  }
                />

                <span className="govid-upload-title">BACK</span>

                <span className="govid-upload-text">
                  {backFile ? backFile.name : "Click to upload photo"}
                </span>
              </label>

            </div>

            <div className="govid-action">
              <button className="govid-continue" onClick={()=>navigate("/Dashboard")}>
                CONTINUE
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Govid;
