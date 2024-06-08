import * as vscode from 'vscode';
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function setApiToken(context: vscode.ExtensionContext) {

    try {
        const token = await vscode.window.showInputBox({
            title: "Insert the AI Token",
            prompt: "Insert your Api Token to proceed",
            password: true,
            placeHolder: "Ex: Aps2kss31239#iskasd___239"
        });

        if (token) {
            await context.globalState.update('apiToken', token);
            vscode.window.showInformationMessage("API token set succesfully!");
        }
        else {
            vscode.window.showWarningMessage("API token setting was cancelled!");
        }
    } catch (error: any) {
        vscode.window.showErrorMessage(`Error on setting API Token: ${error.message}`);
    }


}

export function getApiToken(context: vscode.ExtensionContext) {
    const token = context.globalState.get('apiToken');

    if (token) {
        vscode.window.showInformationMessage(`Your API Token is:${token}`);
    }
    else {
        vscode.window.showWarningMessage("You haven't set your API. Please set it first!");
    }
}

export async function resetToken(context: vscode.ExtensionContext) {
    await context.globalState.update('apiToken', undefined);
    vscode.window.showInformationMessage("Api token was removed");
}


export async function getReadmeContentFromAI(context: vscode.ExtensionContext, jsonMsg: string) {

    const token = context.globalState.get('apiToken');

    if (token) {
        const genAI = new GoogleGenerativeAI(token as string);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            systemInstruction: "Criativo e analítico",
        });
        const generationConfig = {
            temperature: 0.8,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: "Aja como um gerador de readme bem organizado e consistente com base em um JSON de arquivos e pastas de um projeto de programação.\nPor exemplo:\n{\n\"index.js\":\"Arquivo\", \"config.ts\": \"Arquivo\",\nsrc:{\n components:{\n header.tsx: \"arquivo\",\nfooter.tsx:\"arquivo\"\n}\n}\n\n}" },
                        { text: "Sua resposta: \n# Arquivo simples (titulo sugestivo)\nProjeto simples que envolve o uso de poucos elementos em React\n\n## Linguagens utilizadas:\n- Typescript\n- React\n- Javascript\n\n## Arquitetura do projeto\n\n### Pasta componentes\nNela ficam os componentes essenciais do projeto\n" },
                        { text: "Considerando esse exemplo, e estas outras sugestões, como:\n- Seu foco vai ser em analisar a arquitetura, possível foco do projeto com base na arquitetura, linguagens, frameworks e bibliotecas utilizadas\n- Você poderá criar títulos criativos com base na arquitetura de pastas que forem lhe enviadas, contanto que você coloque ao lado \"(Título sugestivo)\" ou \"(Descrição sugestiva)\"" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "## Entendi! 😄 \n\nVou te ajudar a criar READMEs incríveis e organizados a partir da estrutura de pastas e arquivos do seu projeto. \n\nBasta me enviar o JSON com a estrutura do projeto, como no exemplo que você deu, que eu gero um README com:\n\n* **Título Criativo:** Sugestões de títulos que reflitam a proposta do projeto (com a devida indicação de \"(Sugestão)\" para não gerar confusão).\n* **Descrição Concisa:** Uma breve descrição do projeto e seus objetivos (se possível inferir a partir da estrutura).\n* **Tecnologias Utilizadas:** Listagem das linguagens, frameworks e bibliotecas identificadas.\n* **Arquitetura do Projeto:**  Seções detalhadas explicando cada pasta e seus arquivos, com base na estrutura fornecida.\n\n**Exemplo:**\n\n**Estrutura JSON:**\n\n```json\n{\n  \"index.js\": \"Arquivo\", \n  \"config.ts\": \"Arquivo\",\n  \"src\": {\n    \"components\": {\n      \"header.tsx\": \"arquivo\",\n      \"footer.tsx\": \"arquivo\"\n    },\n    \"services\": {\n      \"api.ts\": \"arquivo\"\n    }\n  }\n}\n```\n\n**Saída README.md:**\n\n```markdown\n# Interface Elegante (Sugestão)\n\nProjeto em React com TypeScript que parece focar na construção de uma interface web, possivelmente consumindo dados de uma API. \n\n## Tecnologias Utilizadas:\n\n- React\n- TypeScript\n- JavaScript \n\n## Arquitetura do Projeto\n\n### src/\n\nPasta principal contendo o código fonte da aplicação.\n\n#### src/components/\n\nComponentes reutilizáveis da interface.\n\n- `header.tsx`: Componente do cabeçalho da aplicação.\n- `footer.tsx`: Componente do rodapé da aplicação.\n\n#### src/services/\n\nLógica de comunicação com serviços externos, como APIs.\n\n- `api.ts`: Implementação da comunicação com a API.\n\n### Arquivos da raiz\n\n- `index.js`: Ponto de entrada da aplicação.\n- `config.ts`: Arquivo de configurações da aplicação. \n```\n\n**Observações:**\n\n* Quanto mais completa a estrutura do projeto no JSON, mais preciso e rico será o README gerado.\n* Sinta-se à vontade para me pedir para focar em aspectos específicos do projeto, como \"Documente a API REST\" ou \"Explique o sistema de rotas\". \n\n**Vamos começar? Me envie a estrutura do seu projeto!** 🚀 \n" },
                    ],
                },
                {
                    role: "user",
                    parts: [
                        { text: "{\n  \"folders\": [\n    {\n      \"name\": \".vscode\",\n      \"type\": \"folder\"\n    },\n    {\n      \"name\": \"node_modules\",\n      \"type\": \"folder\"\n    },\n    {\n      \"name\": \"out\",\n      \"type\": \"folder\",\n      \"children\": [\n        {\n          \"name\": \"api\",\n          \"type\": \"folder\"\n        },\n        {\n          \"name\": \"test\",\n          \"type\": \"folder\"\n        },\n        {\n          \"name\": \"utils\",\n          \"type\": \"folder\"\n        }\n      ]\n    },\n    {\n      \"name\": \"extension.js\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \"extension.js.map\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \"src\",\n      \"type\": \"folder\",\n      \"children\": [\n        {\n          \"name\": \"test\",\n          \"type\": \"folder\"\n        },\n        {\n          \"name\": \"utils\",\n          \"type\": \"folder\",\n          \"children\": [\n            {\n              \"name\": \"api.utils.ts\",\n              \"type\": \"file\"\n            },\n            {\n              \"name\": \"utils.ts\",\n              \"type\": \"file\"\n            }\n          ]\n        },\n        {\n          \"name\": \"extension.ts\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \".eslintrc.json\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \".gitignore\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \".vscode-test.mjs\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \".vscodeignore\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"CHANGELOG.md\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"package-lock.json\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"package.json\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"README.md\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"tsconfig.json\",\n          \"type\": \"file\"\n        }\n      ]\n    }\n  ]\n}" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "## Extensão Poderosa (Sugestão)\n\nEste projeto parece ser uma extensão para o Visual Studio Code, desenvolvida em TypeScript, com um foco em funcionalidades de API e testes.\n\n## Tecnologias Utilizadas:\n\n- TypeScript\n- Node.js\n- Visual Studio Code API \n\n## Arquitetura do Projeto\n\n### src/ \n\nDiretório principal do código-fonte da extensão.\n\n- `extension.ts`: Ponto de entrada principal da extensão.\n- `utils/`: Contém funções utilitárias.\n    - `api.utils.ts`:  Utilitários específicos para interação com APIs.\n    - `utils.ts`: Utilitários de propósito geral. \n- `test/`: Pasta para testes automatizados.\n\n### out/\n\nDiretório de saída da compilação do TypeScript.\n\n- `api/`: Contém a compilação dos arquivos da pasta `src/api/`.\n- `test/`: Contém a compilação dos testes.\n- `utils/`: Contém a compilação dos utilitários.\n\n### Arquivos da raiz\n\n- `.vscode/`: Configurações específicas do Visual Studio Code para o projeto.\n- `node_modules/`: Dependências do projeto gerenciadas pelo npm.\n- `extension.js`, `extension.js.map`:  Arquivos da extensão compilados. \n- `.eslintrc.json`: Configurações do ESLint para estilo de código.\n- `.gitignore`: Define arquivos e pastas a serem ignorados pelo Git.\n- `.vscode-test.mjs`: Arquivo de configuração para testes no VS Code.\n- `.vscodeignore`: Define arquivos e pastas a serem ignorados pelo VS Code.\n- `CHANGELOG.md`: Registra as mudanças em cada versão do projeto.\n- `package-lock.json`, `package.json`: Gerenciamento de dependências e metadados do projeto.\n- `README.md`: Este arquivo, contendo a documentação do projeto.\n- `tsconfig.json`: Configurações do compilador TypeScript. \n" },
                    ],
                },
                {
                    role: "user",
                    parts: [
                        { text: "Considere acrescentar icones nos títulos a fim de deixar mais bonito visualmente" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "## 🎨 Entendi! Um toque visual faz toda a diferença! ✨\n\nVou adicionar ícones aos títulos das seções para deixar o README mais atraente. Usei emojis por serem universalmente suportados e adicionarem um toque divertido. 😉\n\n**Veja como ficaria o exemplo anterior com os ícones:**\n\n## 🚀 Extensão Poderosa (Sugestão)\n\nEste projeto parece ser uma extensão para o Visual Studio Code, desenvolvida em TypeScript, com um foco em funcionalidades de API e testes.\n\n## 💻 Tecnologias Utilizadas:\n\n- TypeScript\n- Node.js\n- Visual Studio Code API \n\n## 📂 Arquitetura do Projeto\n\n### 📁 src/ \n\nDiretório principal do código-fonte da extensão.\n\n- `extension.ts`: Ponto de entrada principal da extensão.\n- `utils/` 🧰: Contém funções utilitárias.\n    - `api.utils.ts`:  Utilitários específicos para interação com APIs.\n    - `utils.ts`: Utilitários de propósito geral. \n- `test/` ✅: Pasta para testes automatizados.\n\n### 📁 out/\n\nDiretório de saída da compilação do TypeScript.\n\n- `api/`: Contém a compilação dos arquivos da pasta `src/api/`.\n- `test/`: Contém a compilação dos testes.\n- `utils/`: Contém a compilação dos utilitários.\n\n### 📄 Arquivos da raiz\n\n- `.vscode/` ⚙️: Configurações específicas do Visual Studio Code para o projeto.\n- `node_modules/` 📦: Dependências do projeto gerenciadas pelo npm.\n- `extension.js`, `extension.js.map`:  Arquivos da extensão compilados. \n- `.eslintrc.json`: Configurações do ESLint para estilo de código.\n- `.gitignore`: Define arquivos e pastas a serem ignorados pelo Git.\n- `.vscode-test.mjs`: Arquivo de configuração para testes no VS Code.\n- `.vscodeignore`: Define arquivos e pastas a serem ignorados pelo VS Code.\n- `CHANGELOG.md` 📑: Registra as mudanças em cada versão do projeto.\n- `package-lock.json`, `package.json` 📦: Gerenciamento de dependências e metadados do projeto.\n- `README.md` 📄: Este arquivo, contendo a documentação do projeto.\n- `tsconfig.json` ⚙️: Configurações do compilador TypeScript. \n\n**O que você achou? 😉** \n\nLembre-se: Você pode personalizar os emojis de acordo com a sua preferência ou com o tema do seu projeto. \n\n**Continue me enviando estruturas de projetos para testarmos!** 😄 \n" },
                    ],
                },
                {
                    role: "user",
                    parts: [
                        { text: "Leia esta outra estrutura:" },
                        { text: "{\n  \"folders\": [\n    {\n      \"name\": \".vscode\",\n      \"type\": \"folder\"\n    },\n    {\n      \"name\": \"node_modules\",\n      \"type\": \"folder\"\n    },\n    {\n      \"name\": \"out\",\n      \"type\": \"folder\",\n      \"children\": [\n        {\n          \"name\": \"api\",\n          \"type\": \"folder\"\n        },\n        {\n          \"name\": \"test\",\n          \"type\": \"folder\"\n        },\n        {\n          \"name\": \"utils\",\n          \"type\": \"folder\"\n        }\n      ]\n    },\n    {\n      \"name\": \"extension.js\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \"extension.js.map\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \"src\",\n      \"type\": \"folder\",\n      \"children\": [\n        {\n          \"name\": \"test\",\n          \"type\": \"folder\"\n        },\n        {\n          \"name\": \"utils\",\n          \"type\": \"folder\",\n          \"children\": [\n            {\n              \"name\": \"api.utils.ts\",\n              \"type\": \"file\"\n            },\n            {\n              \"name\": \"utils.ts\",\n              \"type\": \"file\"\n            }\n          ]\n        },\n        {\n          \"name\": \"extension.ts\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \".eslintrc.json\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \".gitignore\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \".vscode-test.mjs\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \".vscodeignore\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"CHANGELOG.md\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"package-lock.json\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"package.json\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"README.md\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"tsconfig.json\",\n          \"type\": \"file\"\n        }\n      ]\n    }\n  ]\n}" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "## 🤔 Hum... Essa estrutura parece familiar! 👀\n\nA estrutura que você enviou é **idêntica** à anterior. \n\nQue tal experimentar com uma estrutura diferente para explorarmos outras possibilidades? 😄 \n\nEnquanto isso, posso te dar algumas ideias de como incrementar o README da extensão, mesmo com a mesma estrutura:\n\n* **Badge de status da build:** Adicione um badge que mostre se a build da extensão está passando ou falhando (integrando com seu CI/CD).\n* **Capturas de tela:** Uma imagem vale mais que mil palavras! Adicione capturas de tela mostrando a extensão em ação. \n* **Exemplo de uso:** Um exemplo simples de como usar a extensão pode ajudar os usuários a começarem rapidamente.\n* **Contribuição:** Se o projeto for open-source, adicione uma seção explicando como contribuir.\n\n**Estou pronto para gerar um novo README quando você estiver com uma nova estrutura!** 🚀 \n" },
                    ],
                },
                {
                    role: "user",
                    parts: [
                        { text: "{\n  \"folders\": [\n    {\n      \"name\": \".github\",\n      \"type\": \"folder\",\n      \"children\": [\n        {\n          \"name\": \"workflows\",\n          \"type\": \"folder\",\n          \"children\": [\n            {\n              \"name\": \"build.yml\",\n              \"type\": \"file\"\n            },\n            {\n              \"name\": \"release.yml\",\n              \"type\": \"file\"\n            }\n          ]\n        }\n      ]\n    },\n    {\n      \"name\": \"docs\",\n      \"type\": \"folder\",\n      \"children\": [\n        {\n          \"name\": \"images\",\n          \"type\": \"folder\"\n        },\n        {\n          \"name\": \"index.md\",\n          \"type\": \"file\"\n        }\n      ]\n    },\n    {\n      \"name\": \"dist\",\n      \"type\": \"folder\"\n    },\n    {\n      \"name\": \"src\",\n      \"type\": \"folder\",\n      \"children\": [\n        {\n          \"name\": \"tests\",\n          \"type\": \"folder\"\n        },\n        {\n          \"name\": \"utils\",\n          \"type\": \"folder\",\n          \"children\": [\n            {\n              \"name\": \"api.utils.ts\",\n              \"type\": \"file\"\n            },\n            {\n              \"name\": \"utils.ts\",\n              \"type\": \"file\"\n            },\n            {\n              \"name\": \"constants.ts\",\n              \"type\": \"file\" \n            }\n          ]\n        },\n        {\n          \"name\": \"extension.ts\",\n          \"type\": \"file\"\n        },\n        {\n          \"name\": \"tsconfig.json\",\n          \"type\": \"file\"\n        }\n      ]\n    },\n    {\n      \"name\": \".eslintrc.js\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \".gitignore\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \".vscodeignore\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \"CHANGELOG.md\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \"package-lock.json\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \"package.json\",\n      \"type\": \"file\"\n    },\n    {\n      \"name\": \"README.md\",\n      \"type\": \"file\"\n    }\n  ]\n}" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "## ✨ Extensão Sofisticada (Sugestão) ✨\n\nEste projeto aparenta ser uma extensão robusta para Visual Studio Code, escrita em TypeScript, com foco em boas práticas de desenvolvimento, como automação de build e release, documentação organizada e testes. \n\n## 💻 Tecnologias Utilizadas:\n\n- TypeScript\n- Node.js\n- Visual Studio Code API\n\n## 📂 Arquitetura do Projeto\n\n### 📁 src/\n\nContém o código-fonte principal da extensão.\n\n- `extension.ts` 🚀: Ponto de entrada principal da extensão.\n- `utils/` 🧰: Funções utilitárias.\n    - `api.utils.ts`: Utilitários para interação com APIs.\n    - `utils.ts`: Utilitários de propósito geral.\n    - `constants.ts`: Define constantes utilizadas na aplicação. \n- `tests/` ✅: Pasta dedicada a testes automatizados.\n\n### 📁 dist/\n\nDiretório para os arquivos da extensão prontos para distribuição (após build).\n\n### 📁 docs/\n\nDocumentação do projeto.\n\n- `index.md`:  Arquivo principal da documentação.\n- `images/`: Imagens utilizadas na documentação.\n\n### 📁 .github/workflows/\n\nFluxos de trabalho automatizados do GitHub Actions.\n\n- `build.yml`: Define o processo de build da extensão.\n- `release.yml`: Define o processo de release de novas versões.\n\n### 📄 Arquivos da raiz\n\n- `.eslintrc.js`: Configurações do ESLint para estilo de código.\n- `.gitignore`: Define arquivos e pastas ignorados pelo Git.\n- `.vscodeignore`: Define arquivos e pastas ignorados pelo VS Code.\n- `CHANGELOG.md` 📑: Histórico de mudanças do projeto.\n- `package-lock.json`, `package.json` 📦: Gerenciamento de dependências.\n- `README.md` 📄: Este arquivo, que você está lendo agora! 😊\n\n## Observações Adicionais\n\n- A presença de um diretório `docs/` sugere que a extensão possui documentação detalhada. Um link para a documentação seria um ótimo complemento para este README. \n- A automação de build e release com GitHub Actions indica um processo de desenvolvimento maduro. \n\nEspero que este README seja um bom ponto de partida! 🎉" },
                    ],
                },
            ],
        });


        const result = await chatSession.sendMessage(jsonMsg);
        return result.response.text();

    }
}
