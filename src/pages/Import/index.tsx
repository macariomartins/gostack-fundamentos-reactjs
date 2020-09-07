import filesize from 'filesize';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import alert from '../../assets/alert.svg';
import FileList from '../../components/FileList';
import Header from '../../components/Header';
import Upload from '../../components/Upload';
import api from '../../services/api';
import { Container, Footer, ImportFileContainer, Title } from './styles';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    if (!uploadedFiles.length) return;

    const uploadedFile = uploadedFiles[0];
    data.append('file', uploadedFile.file, uploadedFile.file.name);

    try {
      await api.post('/transactions/import', data);

      // eslint-disable-next-line no-alert
      window.alert('Transações importadas com sucesso!');

      history.push('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const fileObjects = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles(fileObjects);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
